import { useState } from "react";
import { adminLogin } from "../../api/api";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import React from "react";

const DangNhapAdmin = () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [thongBao, setThongBao] = useState("");
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleLogin = async () => {
        try {
            const data = await adminLogin(tenDangNhap, matKhau);
            alert("Đăng nhập thành công!");
            localStorage.setItem("admin", JSON.stringify(data)); // Lưu thông tin admin
            navigate("/admin"); // Điều hướng tới trang admin bằng react-router
        } catch (error) {
            setThongBao("Sai tài khoản hoặc mật khẩu");
        }
    };

    return (
        <div className="dang-nhap-admin">
            <h2>Đăng nhập Admin</h2>
            <div>
            <input
                type="text"
                placeholder="Tên đăng nhập"
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
            />
            <button onClick={handleLogin}>Đăng nhập</button>
            {thongBao && <p>{thongBao}</p>}
            </div>
        </div>
    );
};

export default DangNhapAdmin;
