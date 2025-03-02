import { Routes, Route } from "react-router-dom";
import DanhSachThiSinh from "./DanhSachThiSinh";
import AdminDashboard from "./AdminDashboard";
import ChiTietNganhHoc from "./ChiTietNganhHoc";
import React from "react";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/danh-sach-thi-sinh" element={<DanhSachThiSinh />} />
      <Route path="/nganh-hoc/:ma_nganh" element={<ChiTietNganhHoc />} />
    </Routes>
  );
};

export default Admin;
