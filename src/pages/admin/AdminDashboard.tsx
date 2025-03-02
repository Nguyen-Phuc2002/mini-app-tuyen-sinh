import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar"; // Import Sidebar
import DanhSachThiSinh from "./DanhSachThiSinh"; // Import danh sách thí sinh
import { useNavigate } from "react-router-dom"; 

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<string>(""); // Trạng thái của tab

    useEffect(() => {
        const adminData = localStorage.getItem("admin");
        if (!adminData) {
            alert("Bạn cần đăng nhập trước!");
            navigate("/admin/login");
        } else {
            setAdmin(JSON.parse(adminData));
        }
    }, [navigate]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab); // Cập nhật khi người dùng nhấn vào tab
    };

    return (
        <div className="flex">
            {/* ✅ Hiển thị Sidebar */}
            <AdminSidebar onTabChange={handleTabChange} />
            
            {/* Nội dung chính */}
            <div className="flex-1 p-6">
                <h2 className="text-3xl font-bold">Trang Quản Lý</h2>
                {admin && <p className="mb-4">Xin chào, {admin.ten_dang_nhap}!</p>}
                <hr className="my-4" />

                {/* Hiển thị nội dung tùy thuộc vào tab */}
                {activeTab === "home" && <p>Chào mừng bạn đến với trang chủ quản lý!</p>}
                {activeTab === "danhSachThiSinh" && <DanhSachThiSinh />} {/* Hiển thị danh sách thí sinh */}
            </div>
        </div>
    );
};

export default AdminDashboard;
