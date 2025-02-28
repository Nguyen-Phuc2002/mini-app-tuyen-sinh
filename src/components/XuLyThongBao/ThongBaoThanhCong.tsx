import React from "react";
import { useNavigate } from "react-router-dom";

const ThongBaoThanhCong = ({ message }: { message: string }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Quay về trang chủ khi bấm đóng
  };

  return (
    <div className="thong-bao-thanh-cong">
      <h3>{message}</h3>
      <button onClick={handleClose}>Đóng</button>
    </div>
  );
};

export default ThongBaoThanhCong;
