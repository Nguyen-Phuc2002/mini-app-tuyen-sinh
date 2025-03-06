import { Link, Routes, Route, Navigate } from "react-router-dom";
import QuanLyDangKy from "../pages/canbo/QuanLyDangKy";
import GiaiDapThacMac from "../pages/canbo/GiaiDapThacMac";
import React from "react";

const userCanBo = localStorage.getItem("role") === "canbo";

const CanBoLayout = () => {
  if (!userCanBo) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>📌 Trang Cán bộ Tuyển Sinh</h1>
      <nav>
        <ul>
          <li><Link to="/can-bo/quan-ly-dang-ky">📂 Quản lý Đăng ký</Link></li>
          <li><Link to="/can-bo/giai-dap-thac-mac">💬 Giải đáp Thắc mắc</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="quan-ly-dang-ky" element={<QuanLyDangKy />} />
        <Route path="giai-dap-thac-mac" element={<GiaiDapThacMac />} />
      </Routes>
    </div>
  );
};

export default CanBoLayout;
