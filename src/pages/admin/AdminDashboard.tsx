import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar"; // ✅ Import Sidebar

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<any>(null);

    useEffect(() => {
        const adminData = localStorage.getItem("admin");
        if (!adminData) {
            alert("Bạn cần đăng nhập trước!");
            navigate("/admin/login");
        } else {
            setAdmin(JSON.parse(adminData));
        }
    }, [navigate]);

    return (
        <div className="flex">
            {/* ✅ Hiển thị Sidebar */}
            <AdminSidebar />
            
            {/* Nội dung chính */}
            <div className="flex-1 p-6 ml-64">
                <h2 className="text-3xl font-bold">Trang Quản Lý</h2>
                {admin && <p className="mb-4">Xin chào, {admin.ten_dang_nhap}!</p>}
                <hr className="my-4" />
                <p>Chọn chức năng từ menu bên trái...</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
