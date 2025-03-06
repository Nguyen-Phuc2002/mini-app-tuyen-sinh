import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import React from "react";

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
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
    <div className="flex h-screen">
      {/* Sidebar bên trái */}
      <AdminSidebar />

      {/* Nội dung chính bên phải */}
      <div className="flex-1 p-4 bg-gray-100 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">🎯 Trang Quản Trị</h1>
        {admin?.quyen === "admin" ? (
          <div>
            <h2>Chào mừng, {admin?.ten_dang_nhap}</h2>
            <Outlet />
          </div>
        ) : (
          <p>Không có quyền truy cập vào trang này.</p>
        )}
        
      </div>
    </div>
  );
};

export default AdminDashboard;
