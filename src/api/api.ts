const API_BASE_URL  = "http://192.168.1.12:3001";

/* --- Đăng ký xét tuyển --- */
export const dangKyXetTuyen = async (data: {
    ho_ten: string;
    ngay_sinh: string;
    gioi_tinh: string;
    email: string;
    so_dien_thoai: string;
    cmnd: string;
    nam_tot_nghiep: number;
    tinh_thanh: string;
    truong_thpt: string;
    ten_phuong_thuc: string;
    ten_nganh: string;
}) => {
    const res = await fetch(`${API_BASE_URL}/dang-ky-xet-tuyen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const layDanhSachDangKy = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/dang-ky-xet-tuyen`);
        if (!res.ok) {
            throw new Error("Không thể lấy danh sách thí sinh.");
        }
        const data = await res.json();
        console.log(data); // Kiểm tra dữ liệu trong console
        return data; // Đảm bảo trả về dữ liệu đúng
    } catch (error) {
        console.error("Lỗi lấy danh sách thí sinh:", error);
        throw error;
    }
};


export const xoaDangKy = async (id: number) => {
    try {
        const res = await fetch(`${API_BASE_URL}/dang-ky-xet-tuyen/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Không thể xóa thí sinh.");
        return await res.json(); // Trả về kết quả xóa thành công
    } catch (error) {
        console.error("Lỗi xóa đăng ký:", error);
        throw error;
    }
};



/* --- Lấy danh sách ngành học --- */
export const layDanhSachNganh = async () => {
    const res = await fetch(`${API_BASE_URL }/nganh-hoc`);
    return res.json();
};

/* --- Lấy danh sách khối xét tuyển --- */
export const layDanhSachXetTuyen = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/xet-tuyen`);
        if (!res.ok) {
            throw new Error("Không thể lấy danh sách khối xét tuyển.");
        }
        const data = await res.json();
        console.log(data); // Kiểm tra dữ liệu trong console
        return data; // Đảm bảo trả về dữ liệu đúng
    } catch (error) {
        console.error("Lỗi lấy danh sách khối xét tuyển:", error);
        throw error;
    }
};

// API lấy danh sách ngành học và khối xét tuyển
export const layDanhSachNganhXetTuyen = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/nganh-xet-tuyen`);
        if (!res.ok) {
            throw new Error("Không thể lấy danh sách ngành học và khối xét tuyển.");
        }
        const data = await res.json();
        console.log(data);  // Kiểm tra dữ liệu
        return data; // Đảm bảo trả về dữ liệu đúng
    } catch (error) {
        console.error("Lỗi lấy danh sách ngành học và khối xét tuyển:", error);
        throw error;
    }
};

// Lấy danh sách phương thức xét tuyển 
export const layDanhSachPhuongThuc = async () => {
    const res = await fetch(`${API_BASE_URL}/phuong-thuc-xet-tuyen`);
    return res.json();
};

/* --- Đăng nhập tài khoản Admin --- */
export const adminLogin = async (ten_dang_nhap: string, mat_khau: string) => {
    try {
        const res = await fetch(`${API_BASE_URL}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ten_dang_nhap, mat_khau })
        });

        return res.json(); 
    } catch (error) {
        console.error("Lỗi kết nối API:", error);
        return { success: false, message: "Lỗi kết nối đến server" };
    }
};

// API Lấy danh sách tài khoản (Admin và Cán bộ)
export const layDanhSachTaiKhoan = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/tai-khoan`);
      if (!res.ok) {
        throw new Error("Không thể lấy danh sách tài khoản.");
      }
      const data = await res.json();
      return data; // Trả về danh sách tài khoản
    } catch (error) {
      console.error("Lỗi lấy danh sách tài khoản:", error);
      throw error;
    }
  };
  
  // API Cập nhật quyền tài khoản
  export const capNhatQuyenTaiKhoan = async (id: number, quyen: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/tai-khoan/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quyen }),
      });
  
      if (!res.ok) {
        throw new Error("Không thể cập nhật quyền tài khoản.");
      }
  
      const data = await res.json();
      return data; // Trả về kết quả cập nhật thành công
    } catch (error) {
      console.error("Lỗi cập nhật quyền tài khoản:", error);
      throw error;
    }
  };
  
  // API Xóa tài khoản
  export const xoaTaiKhoan = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/tai-khoan/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Không thể xóa tài khoản.");
      }
  
      const data = await res.json();
      return data; // Trả về kết quả xóa thành công
    } catch (error) {
      console.error("Lỗi xóa tài khoản:", error);
      throw error;
    }
  };
  

/* --- Ghi lịch sử đăng nhập Admin --- */
export const ghiLichSuDangNhap = async (admin_id: number, dia_chi_ip: string) => {
    const res = await fetch(`${API_BASE_URL }/lich-su-dang-nhap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_id, dia_chi_ip }),
    });
    return res.json();
};

/* --- Lấy danh sách tin tức --- */
export const layDanhSachTinTuc = async () => {
    const res = await fetch(`${API_BASE_URL }/tin-tuc`);
    return res.json();
};

// 📌 Lấy danh sách thông báo
export const getThongBao = async () => {
    const res = await fetch(`${API_BASE_URL}/thong-bao`);
    return res.json();
};

export const xoaThongBao = async (id: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/thong-bao/${id}`, {
            method: "DELETE",
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi xóa thông báo:", error);
    }
};

// 📌 Gửi thông báo mới
export const postThongBao = async (tieu_de: string, noi_dung: string, loai: string) => {
    const res = await fetch(`${API_BASE_URL}/thong-bao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tieu_de, noi_dung, loai }),
    });
    if (!res.ok) throw new Error("Không thể gửi thông báo");
    return res.json();
};

/* --- Lấy danh sách hình ảnh --- */
export const layDanhSachHinhAnh = async () => {
    const res = await fetch(`${API_BASE_URL }/hinh-anh`);
    return res.json();
};
