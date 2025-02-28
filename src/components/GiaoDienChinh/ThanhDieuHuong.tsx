import React from "react";
import { Link } from "react-router-dom";

const ThanhDieuHuong = () => {
  return (
    <nav className="nut-chinh">
      <Link to="/dang-ky-xet-tuyen" className="nut nut-dangky">
        <div className="icon">📅</div>
        <span>Đăng ký</span>
      </Link>
      <Link to="/cam-nang" className="nut nut-camnang">
        <div className="icon">📖</div>
        <span>Cẩm nang</span>
      </Link>
      <Link to="/nganh-hoc" className="nut nut-nganhhoc">
        <div className="icon">🎓</div>
        <span>Ngành học</span>
      </Link>
      <Link to="/lien-he" className="nut nut-lienhe">
        <div className="icon">📞</div>
        <span>Liên hệ</span>
      </Link>
    </nav>
  );
};

export default ThanhDieuHuong;
