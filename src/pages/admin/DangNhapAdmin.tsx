import { useState } from "react";
import { adminLogin } from "../../api/api";
import React from "react";

const DangNhapAdmin = () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [thongBao, setThongBao] = useState("");

    const handleLogin = async () => {
        try {
            const data = await adminLogin(tenDangNhap, matKhau);
            alert("Đăng nhập thành công!");
            localStorage.setItem("admin", JSON.stringify(data)); // Lưu thông tin admin
            window.location.href = "/admin"; // Điều hướng đến trang admin
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

