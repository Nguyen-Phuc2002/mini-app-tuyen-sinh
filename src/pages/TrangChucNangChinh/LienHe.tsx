import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ChanTrang from "../../components/GiaoDienChinh/ChanTrang";

const LienHe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Xử lý logic gửi dữ liệu biểu mẫu ở đây
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen">
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-blue-700">Thông Tin Liên Hệ</h2>
        <p>🏫 Trường Đại học Bình Dương - Phân hiệu Cà Mau</p>
        <p>📍 Địa chỉ: Số 3, Đường Nguyễn Tất Thành, TP. Cà Mau</p>
        <p>📞 Số điện thoại: (0290) 3838 888</p>
        <p>📧 Email: tuyensinh@bdcm.edu.vn</p>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-700">Gửi Tin Nhắn Liên Hệ</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left">Tên:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-left">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-left">Số điện thoại:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-left">Tin nhắn:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Gửi
          </button>
        </form>
      </div>
      <div className="fixed bottom-4 right-4">
        <div
          className="cursor-pointer bg-blue-700 text-white rounded-full p-3 hover:bg-blue-800"
          onClick={handleHomeClick}
        >
          <FontAwesomeIcon icon={faHome} size="2x" />
        </div>
      </div>
    </div>
  );
};

export default LienHe;