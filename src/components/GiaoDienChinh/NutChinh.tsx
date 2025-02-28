import React from "react";
import { FaRegCalendarCheck, FaBookOpen, FaGraduationCap, FaPhone } from "react-icons/fa6";

const NutChinh = () => {
  return (
    <div className="nut-chinh">
      <a href="/dang-ky-xet-tuyen" target="_blank" rel="noopener noreferrer" className="nut do">
        <FaRegCalendarCheck className="icon" />
        <span>Đăng ký</span>
      </a>
      <a href="/cam-nang" className="nut xanh">
        <FaBookOpen className="icon" />
        <span>Cẩm nang</span>
      </a>
      <a href="/nganh-hoc" className="nut xanh-la">
        <FaGraduationCap className="icon" />
        <span>Ngành học</span>
      </a>
      <a href="/lien-he" className="nut vang">
        <FaPhone className="icon" />
        <span>Liên hệ</span>
      </a>
    </div>
  );
};

export default NutChinh;
