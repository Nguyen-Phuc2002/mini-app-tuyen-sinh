import React from "react";
import { NavLink } from "react-router-dom";

const ChanTrang = () => {
  return (
    <nav className="chan-trang">
      <NavLink to="/" className={({ isActive }) => isActive ? "muc active" : "muc"}>
        <div className="icon">🏠</div>
        <span>Trang chủ</span>
      </NavLink>
      <NavLink to="/thong-bao" className={({ isActive }) => isActive ? "muc active" : "muc"}>
        <div className="icon">🔔</div>
        <span>Thông báo</span>
      </NavLink>
    </nav>
  );
};

export default ChanTrang;
