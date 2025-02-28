import React, { useEffect, useState } from "react";
import { layDanhSachTinTuc } from "../../api/api";

function TinTuc() {
  interface TinTucType {
    id: number;
    tieu_de: string;
    noi_dung: string;
    duong_dan_anh: string;
    ngay_dang: string;
    link: string;
  }

  const [tinTuc, setTinTuc] = useState<TinTucType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTinTuc = async () => {
      try {
        const response = await layDanhSachTinTuc();
        setTinTuc(response);
        setLoading(false);
      } catch (error) {
        setError("Lỗi khi lấy dữ liệu tin tức.");
        setLoading(false);
      }
    };

    fetchTinTuc();
  }, []);

  return (
    <div className="tin-tuc-container">
      <h2 className="text-2xl font-bold text-black text-center">Tin Tức - Sự Kiện</h2>
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="tin-tuc-list">
        {tinTuc.length > 0 ? (
          tinTuc.map((tin, index) => (
            <div key={index} className="tin-tuc-item mb-8 p-4 border border-gray-300 rounded-lg shadow-md">
              {tin.duong_dan_anh ? (
                <div className="w-full mb-4">
                  <img
                    src={tin.duong_dan_anh}
                    alt={tin.tieu_de}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full mb-4">
                  <img
                    src="/path/to/default-image.jpg" // Hình ảnh mặc định
                    alt="Default"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              <div className="w-full">
                <a
                  href={tin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold mb-2 text-blue-700 hover:underline"
                >
                  {tin.tieu_de}
                </a>
                <p className="text-sm mb-2">{tin.noi_dung}</p>
                <p className="text-gray-500 text-xs">Ngày đăng: {new Date(tin.ngay_dang).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Không có tin tức nào.</p>
        )}
      </div>
    </div>
  );
}

export default TinTuc;
