import React from "react";
import { Link } from "react-router-dom";

const TrangChuAdmin = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Trang Quản Trị</h2>
      <ul>
        <li><Link to="/admin/thong-bao">Quản lý Thông Báo</Link></li>
        <li><Link to="/admin/nguoi-dung">Quản lý Người Dùng</Link></li>
        <li><Link to="/admin/nganh-hoc">Quản lý Ngành Học</Link></li>
      </ul>
    </div>
  );
};

export default TrangChuAdmin;
