import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { layDanhSachNganhXetTuyen, layDanhSachXetTuyen } from "../../api/api"; // API lấy danh sách ngành học và khối xét tuyển

const NganhHoc = () => {
  interface NganhHocType {
    ten_nganh: string;
    ma_nganh: string;
    khoi_xet_tuyen: string;
    to_hop_mon: string;
  }

  const [nganhHoc, setNganhHoc] = useState<NganhHocType[]>([]);
  const [xetTuyen, setXetTuyen] = useState<any[]>([]); // Khối xét tuyển
  const [showModal, setShowModal] = useState(false); // Điều khiển hiển thị modal
  const [selectedNganh, setSelectedNganh] = useState<NganhHocType | null>(null); // Ngành học được chọn
  const navigate = useNavigate(); // Khai báo useNavigate()

  useEffect(() => {
    const fetchNganhHoc = async () => {
      try {
        const response = await layDanhSachNganhXetTuyen();
        if (Array.isArray(response)) {
          setNganhHoc(response);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu ngành học:", error);
      }
    };

    const fetchXetTuyen = async () => {
      try {
        const response = await layDanhSachXetTuyen();
        if (Array.isArray(response)) {
          setXetTuyen(response);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu khối xét tuyển:", error);
      }
    };

    fetchNganhHoc();
    fetchXetTuyen();
  }, []);

  const handleXemChiTiet = (ma_nganh: string) => {
    navigate(`/nganh-hoc/${ma_nganh}`); // Điều hướng đến trang chi tiết ngành học
  };

  return (
    <div className="nganh-hoc-container">
      <div className="nganh-hoc-header">
        <h2>Danh Sách Ngành Học</h2>
      <div className="nganh-hoc-list">
        {nganhHoc.length > 0 ? (
          nganhHoc.map((nganh, index) => (
            <div key={index} className="nganh-hoc-item">
              <h3>{nganh.ten_nganh}</h3>
              <p><strong>Mã ngành:</strong> {nganh.ma_nganh}</p>
              <p><strong>Khối Xét Tuyển:</strong> {nganh.khoi_xet_tuyen}</p>
              <button onClick={() => handleXemChiTiet(nganh.ma_nganh)}>Xem chi tiết</button>
            </div>
          ))
        ) : (
          <p>Không có dữ liệu ngành học.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default NganhHoc;
