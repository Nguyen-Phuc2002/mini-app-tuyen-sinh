import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { layDanhSachNganhXetTuyen } from "../../api/api"; // API lấy danh sách ngành học và khối xét tuyển

const ChiTietNganhHoc = () => {
  const { ma_nganh } = useParams(); // Lấy mã ngành từ URL
  const [nganhHoc, setNganhHoc] = useState<any | null>(null);

  useEffect(() => {
    const fetchNganhHoc = async () => {
      try {
        const response = await layDanhSachNganhXetTuyen();
        const nganh = response.find((item: any) => item.ma_nganh === ma_nganh);
        if (nganh) {
          setNganhHoc(nganh);
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu ngành học:", error);
      }
    };

    if (ma_nganh) {
      fetchNganhHoc();
    }
  }, [ma_nganh]);

  return (
    <div className="nganh-hoc-detail-container">
      {nganhHoc ? (
        <>
          <h2>Chi tiết Ngành Học</h2>
          <p><strong>Tên Ngành:</strong> {nganhHoc.ten_nganh}</p>
          <p><strong>Mã Ngành:</strong> {nganhHoc.ma_nganh}</p>

          {/* Hiển thị Khối Xét Tuyển kết hợp với Tổ hợp môn */}
          <div>
            <strong>Khối Xét Tuyển & Tổ hợp môn:</strong>
            <ul>
              {nganhHoc.khoi_xet_tuyen.split(",").map((khoi: string, index: number) => (
                <li key={index}>
                  <strong>Khối {khoi}:</strong> {nganhHoc.to_hop_mon.split(",")[index] || "Không có tổ hợp môn"}
                </li>
              ))}
            </ul>
          </div>

          {/* Phương pháp đánh giá */}
          <div>
            <strong>Phương Thức Xét tuyển:</strong>
            <ul>
              <li>Xét tuyển dựa vào điểm trung bình cao nhất các môn học của học kỳ 1,2 lớp 10, kỳ 1 lớp 11, kỳ 1 lớp 12</li>
              <li>Xét tuyển dựa vào kết quả thi đánh giá năng lực</li>
              <li>Xét tuyển dựa vào kết quả học tập năm lớp 12</li>
              <li>Xét tuyển dựa vào kết quả học tập 3 năm lớp 10,11,12</li>
              <li>Xét tuyển dựa vào kết quả kỳ thi tốt nghiệp THPT</li>
            </ul>
          </div>

          {/* Địa điểm đào tạo */}
          <div>
            <strong>Địa điểm đào tạo:</strong>
            <ul>
              <li>PHÂN HIỆU TRƯỜNG ĐẠI HỌC BÌNH DƯƠNG TẠI CÀ MAU Số 3, đường Lê Thị Riêng, P. 5, TP. Cà Mau, T. Cà Mau</li>
            </ul>
          </div>
        </>
      ) : (
        <p>Không tìm thấy ngành học này.</p>
      )}
    </div>
  );
};

export default ChiTietNganhHoc;
