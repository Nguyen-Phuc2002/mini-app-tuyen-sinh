import React, { useEffect, useState } from "react";
import { layDanhSachNganh } from "../../api/api";

const NganhHoc = () => {
  interface NganhHocType {
    ten_nganh: string;
    ma_nganh: string;
  }

  const [nganhHoc, setNganhHoc] = useState<NganhHocType[]>([]);

  useEffect(() => {
    const fetchNganhHoc = async () => {
      try {
        const response = await layDanhSachNganh();
        console.log("API response:", response); // Thêm dòng này để kiểm tra dữ liệu
        if (Array.isArray(response)) {
          setNganhHoc(response);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu ngành học:", error);
      }
    };

    fetchNganhHoc();
  }, []);

  const handleXemChiTiet = (nganh: NganhHocType) => {
    // Xử lý logic khi bấm nút "Xem chi tiết"
    console.log("Xem chi tiết ngành:", nganh);
  };

  return (
    <div className="nganh-hoc-container">
      <h2>Danh sách Ngành Học</h2>
      <div className="nganh-hoc-list">
        {nganhHoc.length > 0 ? (
          nganhHoc.map((nganh, index) => (
            <div key={index} className="nganh-hoc-item">
              <h3>{nganh.ten_nganh}</h3>
              <p>Mã ngành: {nganh.ma_nganh}</p>
              <button onClick={() => handleXemChiTiet(nganh)}>Xem chi tiết</button>
            </div>
          ))
        ) : (
          <p>Không có dữ liệu ngành học.</p>
        )}
      </div>
    </div>
  );
};

export default NganhHoc;