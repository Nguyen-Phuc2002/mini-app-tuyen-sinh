import React from "react";
import { Outlet } from "react-router-dom"; // Dùng Outlet để hiển thị các trang con của cán bộ
import CanBoSidebar from "../../components/canbo/CanboSidebar"; // Sidebar riêng cho Cán Bộ

const CanBoLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar bên trái cho cán bộ */}
      <CanBoSidebar />

      {/* Nội dung bên phải sẽ thay đổi dựa vào các trang con */}
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">🎯 Cán Bộ Dashboard</h1>
        <Outlet /> {/* Đây là nơi các trang con sẽ hiển thị */}
      </div>
    </div>
  );
};

export default CanBoLayout;
