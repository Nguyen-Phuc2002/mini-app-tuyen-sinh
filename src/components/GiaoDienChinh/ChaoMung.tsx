import React from "react";

const ChaoMung = () => {
  // Lấy giờ hiện tại để hiển thị lời chào phù hợp
  const getLoiChao = () => {
    const gio = new Date().getHours();
    if (gio < 12) return "Chào buổi sáng!";
    if (gio < 18) return "Chào buổi chiều!";
    return "Chào buổi tối!";
  };

  return (
    <div className="text-center text-lg font-semibold py-2 text-gray-800">
      {getLoiChao()} 👋 Chào mừng bạn đến với hệ thống tuyển sinh!
    </div>
  );
};

export default ChaoMung;
