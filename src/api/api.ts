const API_BASE_URL  = "http://192.168.1.203:3001";

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

/* --- Lấy danh sách phương thức xét tuyển --- */
export const layDanhSachPhuongThuc = async () => {
    const res = await fetch(`${API_BASE_URL}/phuong-thuc-xet-tuyen`);
    return res.json();
};

/* --- Đăng nhập tài khoản Admin --- */
export const adminLogin = async (ten_dang_nhap: string, mat_khau: string) => {
    try {
        const res = await fetch(`${API_BASE_URL }/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ten_dang_nhap, mat_khau }),
        });
        if (!res.ok) throw new Error("Đăng nhập thất bại");
        return res.json();
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
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
