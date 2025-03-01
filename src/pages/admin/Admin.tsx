import { Routes, Route } from "react-router-dom";
import DanhSachThiSinh from "./DanhSachThiSinh";
import AdminDashboard from "./AdminDashboard";
import React from "react";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/danh-sach-thi-sinh" element={<DanhSachThiSinh />} />
    </Routes>
  );
};

export default Admin;
