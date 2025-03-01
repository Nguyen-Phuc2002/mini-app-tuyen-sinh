import { Routes, Route } from "react-router-dom";
import TrangChu from "../pages/TrangChu";
import NganhHoc from "../pages/TrangChucNangChinh/NganhHoc";
import DangKyXetTuyen from "../pages/TrangChucNangChinh/DangKyXetTuyen";
import LienHe from "../pages/TrangChucNangChinh/LienHe";
import CamNang from "../pages/TrangChucNangChinh/CamNang";
import ThongBao from "../pages/ThongBao";
import React from "react";
import DangNhapAdmin from "../pages/admin/DangNhapAdmin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DanhSachThiSinh from "../pages/admin/DanhSachThiSinh";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<TrangChu />} />
      <Route path="/nganh-hoc" element={<NganhHoc />} />
      <Route path="/dang-ky-xet-tuyen" element={<DangKyXetTuyen />} />
      <Route path="/lien-he" element={<LienHe />} />
      <Route path="/cam-nang" element={<CamNang />} />
      <Route path="/thong-bao" element={<ThongBao />} />
      {/* Route riêng cho Admin */}
      <Route path="/admin/login" element={<DangNhapAdmin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/thi-sinh" element={<DanhSachThiSinh />} />
    </Routes>
  );
}

export default Router;