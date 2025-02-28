// src/pages/DangKyXetTuyen.tsx
import React, { useState, useEffect } from "react";
import { dangKyXetTuyen } from "../../api/api";
import { layDanhSachNganh, layDanhSachPhuongThuc } from "../../api/api";
import ThongBaoLoi from "../../components/XuLyThongBao/ThongBaoLoi";
import ThongBaoThanhCong from "../../components/XuLyThongBao/ThongBaoThanhCong";

const DangKyXetTuyen = () => {
  const [hoTen, setHoTen] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [gioiTinh, setGioiTinh] = useState("");
  const [email, setEmail] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [cmnd, setCmnd] = useState("");
  const [namTotNghiep, setNamTotNghiep] = useState(0);
  const [tinhThanh, setTinhThanh] = useState("");
  const [truongThpt, setTruongThpt] = useState("");
  const [tenPhuongThuc, setTenPhuongThuc] = useState("");
  const [tenNganh, setTenNganh] = useState("");

  const [nganhHoc, setNganhHoc] = useState([]);
  const [phuongThuc, setPhuongThuc] = useState([]);

  const [thongBao, setThongBao] = useState<{ type: string, message: string } | null>(null);

  useEffect(() => {
    const fetchNganhHoc = async () => {
      const nganh = await layDanhSachNganh();
      setNganhHoc(nganh);
    };

    const fetchPhuongThuc = async () => {
      const phuongThucList = await layDanhSachPhuongThuc();
      setPhuongThuc(phuongThucList);
    };

    fetchNganhHoc();
    fetchPhuongThuc();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      ho_ten: hoTen,
      ngay_sinh: ngaySinh,
      gioi_tinh: gioiTinh,
      email: email,
      so_dien_thoai: soDienThoai,
      cmnd: cmnd,
      nam_tot_nghiep: namTotNghiep,
      tinh_thanh: tinhThanh,
      truong_thpt: truongThpt,
      ten_phuong_thuc: tenPhuongThuc,
      ten_nganh: tenNganh,
    };

    try {
      const response = await dangKyXetTuyen(formData);
      setThongBao({ type: "success", message: response.message });
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      setThongBao({ type: "error", message: "Đã xảy ra lỗi khi đăng ký!" });
    }
  };

  return (
    <div>
      <h2>Đăng ký xét tuyển</h2>
      
      {thongBao && thongBao.type === "error" && <ThongBaoLoi message={thongBao.message} />}
      {thongBao && thongBao.type === "success" && <ThongBaoThanhCong message={thongBao.message} />}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ và tên:</label>
          <input
            type="text"
            value={hoTen}
            onChange={(e) => setHoTen(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ngày sinh:</label>
          <input
            type="date"
            value={ngaySinh}
            onChange={(e) => setNgaySinh(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Giới tính:</label>
          <select
            value={gioiTinh}
            onChange={(e) => setGioiTinh(e.target.value)}
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input
            type="text"
            value={soDienThoai}
            onChange={(e) => setSoDienThoai(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CMND/CCCD:</label>
          <input
            type="text"
            value={cmnd}
            onChange={(e) => setCmnd(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Năm tốt nghiệp:</label>
          <input
            type="text"
            value={namTotNghiep}
            onChange={(e) => setNamTotNghiep(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Tỉnh/Thành phố:</label>
          <input
            type="text"
            value={tinhThanh}
            onChange={(e) => setTinhThanh(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Trường THPT:</label>
          <input
            type="text"
            value={truongThpt}
            onChange={(e) => setTruongThpt(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ngành học:</label>
          <select
            value={tenNganh}
            onChange={(e) => setTenNganh(e.target.value)}
            required
          >
            <option value="">Chọn ngành học</option>
            {nganhHoc.map((item: { ten_nganh: string }, index: number) => (
              <option key={index} value={item.ten_nganh}>
                {item.ten_nganh}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Phương thức xét tuyển:</label>
          <select
            value={tenPhuongThuc}
            onChange={(e) => setTenPhuongThuc(e.target.value)}
            required
          >
            <option value="">Chọn phương thức</option>
            {phuongThuc.map((item: { ten_phuong_thuc: string }, index: number) => (
              <option key={index} value={item.ten_phuong_thuc}>
                {item.ten_phuong_thuc}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default DangKyXetTuyen;
