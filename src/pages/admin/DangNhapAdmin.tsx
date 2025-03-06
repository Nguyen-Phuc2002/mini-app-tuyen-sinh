import { useState } from "react";
import { adminLogin } from "../../api/api";
import { useNavigate } from "react-router-dom";
import React from "react";

const DangNhapAdmin = () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [thongBao, setThongBao] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setThongBao("");
    
        try {
            const res = await adminLogin(tenDangNhap, matKhau);
    
            if (res.success) {
                localStorage.setItem("admin", JSON.stringify(res.user));
    
                if (res.user.quyen === "admin") {
                    navigate("/admin"); // Điều hướng trang Admin
                } else {
                    navigate("/can-bo"); // Điều hướng trang Cán bộ
                }
            } else {
                setThongBao(res.message || "Sai tài khoản hoặc mật khẩu");
            }
        } catch (error) {
            setThongBao("Lỗi kết nối đến máy chủ");
        }
    };
    
    

    return (
        <div className="dang-nhap-admin">
            <h2>Đăng nhập</h2>
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
                {thongBao && <p className="thong-bao">{thongBao}</p>}
            </div>
        </div>
    );
};

export default DangNhapAdmin;
