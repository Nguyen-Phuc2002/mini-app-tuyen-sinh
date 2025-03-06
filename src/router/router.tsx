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
import QuanLyDangKy from "../pages/admin/QuanLyDangKy";
import ChiTietNganhHoc from "../pages/TrangChucNangChinh/ChiTietNganhHoc";
import CanBoLayout from "../layouts/CanBoLayout";
import CanBoGiaiDap from "../pages/canbo/GiaiDapThacMac"; // Thêm trang Giải đáp thắc mắc cho cán bộ
import QuanLyTinTuc from "../pages/admin/QuanLyTinTuc";
import QuanLyNganhHoc from "../pages/admin/QuanLyNganhHoc";
import QuanLyThongBao from "../pages/admin/QuanLyThongBao";
import QuanLyTaiKhoan from "../pages/admin/QuanLyTaiKhoan";

function Router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<TrangChu />} />
      <Route path="/nganh-hoc" element={<NganhHoc />} />
      <Route path="/dang-ky-xet-tuyen" element={<DangKyXetTuyen />} />
      <Route path="/lien-he" element={<LienHe />} />
      <Route path="/cam-nang" element={<CamNang />} />
      <Route path="/thong-bao" element={<ThongBao />} />
      <Route path="/nganh-hoc/:ma_nganh" element={<ChiTietNganhHoc />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<DangNhapAdmin />} />
      <Route path="/admin" element={<AdminDashboard children={undefined}/>}>
      <Route path="dang-ky-xet-tuyen" element={<QuanLyDangKy />} />
      <Route path="quan-ly-nganh-hoc" element={<QuanLyNganhHoc />} />
      <Route path="quan-ly-tai-khoan" element={<QuanLyTaiKhoan />} />
      <Route path="quan-ly-tin-tuc" element={<QuanLyTinTuc />} />
      <Route path="quan-ly-thong-bao" element={<QuanLyThongBao />} />
        {/* Thêm các route admin khác */}
      </Route>

      {/* Cán Bộ Routes */}
      <Route path="/can-bo" element={<CanBoLayout />}>
        <Route path="giai-dap-thac-mac" element={<CanBoGiaiDap />} />
        {/* Thêm các route cán bộ khác */}
      </Route>
    </Routes>
  );
}

export default Router;
