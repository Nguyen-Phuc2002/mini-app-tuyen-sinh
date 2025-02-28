import { useEffect, useState } from "react";
import { getThongBao } from "../api/api";
import ChanTrang from "../components/GiaoDienChinh/ChanTrang";
import React from "react";

const ThongBao = () => {
  const [thongBao, setThongBao] = useState([]);

  useEffect(() => {
    const fetchThongBao = async () => {
      try {
        const data = await getThongBao();
        setThongBao(data);
      } catch (error) {
        console.error("Lỗi tải thông báo:", error);
      }
    };

    fetchThongBao(); // Lấy dữ liệu ngay khi vào trang

    // Thiết lập polling để cập nhật thông báo mỗi 5 giây
    const intervalId = setInterval(fetchThongBao, 5000);

    return () => clearInterval(intervalId); // Dọn dẹp khi component unmount
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Thông Báo</h2>
      {thongBao.length > 0 ? (
        <ul>
          {thongBao.map((tb: any) => (
            <li key={tb.id} className="mb-2 p-2 border rounded">
              <h3 className="font-semibold">{tb.tieu_de}</h3>
              <p>{tb.noi_dung}</p>
              <span className="text-sm text-gray-500">
                {new Date(tb.ngay_tao).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có thông báo nào.</p>
      )}

      <ChanTrang />
    </div>
  );
};

export default ThongBao;