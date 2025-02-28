import React, { useEffect, useState } from "react";
import { layDanhSachHinhAnh } from "../../api/api";

interface Banner {
  id: number;
  ten_anh: string;
  duong_dan_anh: string;
  mo_ta: string;
}

const Banner: React.FC = () => {
  const [bannerList, setBannerList] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanner = async () => {
      const data = await layDanhSachHinhAnh();
      setBannerList(data);
    };

    fetchBanner();
  }, []);

  return (
    <div className="banner-container">
      {bannerList.length > 0 ? (
        bannerList.map((banner) => (
          <div key={banner.id} className="banner-item">
            <img
              src={banner.duong_dan_anh}
              className="banner-image"
            />
          </div>
        ))
      ) : (
        <p>Không có banner nào.</p>
      )}
    </div>
  );
};

export default Banner;
