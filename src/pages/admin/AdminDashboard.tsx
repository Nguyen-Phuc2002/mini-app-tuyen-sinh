import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<any>(null);

    useEffect(() => {
        // Kiểm tra admin đã đăng nhập chưa
        const adminData = localStorage.getItem("admin");
        if (!adminData) {
            alert("Bạn cần đăng nhập trước!");
            navigate("/admin/login");
        } else {
            setAdmin(JSON.parse(adminData));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/admin/login");
    };

    return (
        <div>
            <h2>Trang Quản Lý</h2>
            {admin && <p>Xin chào, {admin.ten_dang_nhap}!</p>}
            <button onClick={handleLogout}>Đăng xuất</button>
            <hr />
            <p>Chức năng quản trị sẽ được thêm tại đây...</p>
            
        </div>
    );
};

export default AdminDashboard;
