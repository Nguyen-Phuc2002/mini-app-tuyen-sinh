import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ChanTrang from "../../components/GiaoDienChinh/ChanTrang";

const CamNang = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-blue-700 text-center">Cẩm Nang Tuyển Sinh</h2>
        <p className="mt-4 text-justify">
          📌 Cẩm nang tuyển sinh giúp thí sinh hiểu rõ hơn về quy trình đăng ký xét tuyển,
          các ngành đào tạo, chính sách ưu đãi, và các thông tin cần thiết để chuẩn bị cho hành trình học tập tại Trường Đại học Bình Dương - Phân hiệu Cà Mau.
        </p>
        <div className="mt-4">
          <iframe
            src="https://camnangtuyensinh.bdu.edu.vn/index.html"
            title="Cẩm Nang Tuyển Sinh"
            className="w-full h-screen rounded-lg shadow-md"
            frameBorder="0"
          ></iframe>
        </div>
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

export default CamNang;