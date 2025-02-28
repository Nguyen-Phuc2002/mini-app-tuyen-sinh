import { useEffect, useState } from "react";
import { layDanhSachNganh, layDanhSachTinTuc, getThongBao, layDanhSachHinhAnh } from "../api/api";
import TieuDe from "../components/GiaoDienChinh/TieuDe";
import ChaoMung from "../components/GiaoDienChinh/ChaoMung";
import ThanhDieuHuong from "../components/GiaoDienChinh/ThanhDieuHuong";
import NutChinh from "../components/GiaoDienChinh/NutChinh";
import TinTuc from "../components/GiaoDienChinh/TinTuc";
import ChanTrang from "../components/GiaoDienChinh/ChanTrang";
import Banner from "../components/GiaoDienChinh/Banner";
import React from "react";


const TrangChu = () => {
  const [nganhHoc, setNganhHoc] = useState([]);
  const [tinTuc, setTinTuc] = useState([]);
  const [thongBao, setThongBao] = useState([]);
  const [hinhAnh, setHinhAnh] = useState([]);
  const [tieuDe, setTieuDe] = useState("");
  const [chaoMung, setChaoMung] = useState("");

  useEffect(() => {
    layDanhSachNganh().then(setNganhHoc);
    layDanhSachTinTuc().then(setTinTuc);
    getThongBao().then(setThongBao);
    layDanhSachHinhAnh().then(setHinhAnh);
  }, []);

  return (
    <div>
      <TieuDe />
      <ChaoMung />
      <Banner />
      <ThanhDieuHuong />
      <TinTuc />
      <ChanTrang />
    </div>
  );
};

export default TrangChu;