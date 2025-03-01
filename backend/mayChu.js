const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); 
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Kết nối MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "123456",
    database: process.env.DB_NAME || "mini_app_tuyen_sinh",
});

db.connect((err) => {
    if (err) {
        console.error("Lỗi kết nối database:", err);
    } else {
        console.log("Kết nối database thành công!");
    }
});

/* --- API Đăng ký xét tuyển --- */
app.post("/dang-ky-xet-tuyen", (req, res) => {
    const {
        ho_ten, ngay_sinh, gioi_tinh, email, so_dien_thoai,
        cmnd, nam_tot_nghiep, tinh_thanh, truong_thpt, 
        ten_phuong_thuc, ten_nganh
    } = req.body;

    const sql = `INSERT INTO dang_ky_xet_tuyen 
        (ho_ten, ngay_sinh, gioi_tinh, email, so_dien_thoai, cmnd, nam_tot_nghiep, tinh_thanh, truong_thpt, ten_phuong_thuc, ten_nganh) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        ho_ten, ngay_sinh, gioi_tinh, email, so_dien_thoai,
        cmnd, nam_tot_nghiep, tinh_thanh, truong_thpt, 
        ten_phuong_thuc, ten_nganh
    ], (err, result) => {
        if (err) {
            console.error("Lỗi đăng ký:", err);
            return res.status(500).json({ message: "Lỗi hệ thống" });
        }
        res.status(201).json({ message: "Đăng ký thành công!" });
    });
});

// --- API Lấy danh sách thí sinh đã đăng ký xét tuyển ---
app.get("/dang-ky-xet-tuyen", (req, res) => {
    const sql = "SELECT * FROM dang_ky_xet_tuyen"; // Truy vấn lấy tất cả thí sinh
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Lỗi khi lấy danh sách thí sinh:", err);
            return res.status(500).json({ success: false, message: "Lỗi hệ thống" });
        }
        res.json(result); // Trả về danh sách thí sinh
    });
});

app.delete("/dang-ky-xet-tuyen/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM dang_ky_xet_tuyen WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Lỗi server" });
        res.json({ success: true, message: "Xóa thành công" });
    });
});


/* --- API Lấy danh sách ngành học --- */
app.get("/nganh-hoc", (req, res) => {
    const sql = "SELECT ten_nganh, ma_nganh FROM nganh_hoc";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Lỗi lấy ngành học:", err);
            return res.status(500).json({ message: "Lỗi hệ thống" });
        }
        res.json(result);
    });
});

/* --- API Lấy danh sách phương thức xét tuyển --- */
app.get("/phuong-thuc-xet-tuyen", (req, res) => {
    const sql = "SELECT ten_phuong_thuc FROM phuong_thuc_xet_tuyen";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Lỗi lấy phương thức:", err);
            return res.status(500).json({ message: "Lỗi hệ thống" });
        }
        res.json(result);
    });
});

/* --- API Lấy danh sách tin tức --- */
app.get("/tin-tuc", (req, res) => {
    const sql = "SELECT * FROM tin_tuc ORDER BY ngay_dang DESC";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Lỗi lấy tin tức:", err);
            return res.status(500).json({ message: "Lỗi hệ thống" });
        }
        res.json(result);
    });
});


// 📌 API Đăng nhập Admin
app.post("/admin/login", (req, res) => {
    const { ten_dang_nhap, mat_khau } = req.body;

    const sql = "SELECT * FROM admin WHERE ten_dang_nhap = ? AND mat_khau = ?";
    db.query(sql, [ten_dang_nhap, mat_khau], (err, results) => {
        if (err) return res.status(500).json({ message: "Lỗi máy chủ" });
        if (results.length > 0) {
            res.json({ message: "Đăng nhập thành công", admin: results[0] });
        } else {
            res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
        }
    });
});

/* 📌 API Ghi lịch sử đăng nhập của Admin --- */
app.post("/lich-su-dang-nhap", (req, res) => {
    const { admin_id, dia_chi_ip } = req.body;
    const sql = "INSERT INTO lich_su_dang_nhap (admin_id, dia_chi_ip) VALUES (?, ?)";
    
    db.query(sql, [admin_id, dia_chi_ip], (err, result) => {
        if (err) {
            console.error("Lỗi ghi lịch sử:", err);
            return res.status(500).json({ message: "Lỗi hệ thống" });
        }
        res.status(201).json({ message: "Ghi lịch sử thành công!" });
    });
});

/* --- API Gửi thông báo --- */
app.post("/thong-bao", (req, res) => {
    const { tieu_de, noi_dung, loai } = req.body;
    const sql = "INSERT INTO thong_bao (tieu_de, noi_dung, loai) VALUES (?, ?, ?)";
    
    db.query(sql, [tieu_de, noi_dung, loai], (err, result) => {
        if (err) {
            console.error("Lỗi gửi thông báo:", err);
            return res.status(500).json({ message: "Lỗi hệ thống" });
        }
        res.status(201).json({ message: "Gửi thông báo thành công!" });
    });
});

/* --- API Lấy danh sách thông báo --- */
app.get("/thong-bao", (req, res) => {
    const sql = "SELECT * FROM thong_bao";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Lỗi lấy thông báo:", err);
            return res.status(500).json({ message: "Lỗi hệ thống" });
        }
        res.json(result);
    });
});

app.delete("/thong-bao/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM thong_bao WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Lỗi server" });
        res.json({ success: true, message: "Xóa thành công" });
    });
});


/* --- API Lấy danh sách hình ảnh --- */
app.get("/hinh-anh", (req, res) => {
    const sql = "SELECT * FROM hinh_anh ORDER BY created_at DESC";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Lỗi lấy hình ảnh:", err);
            return res.status(500).json({ message: "Lỗi hệ thống" });
        }
        res.json(result);
    });
});

/* --- Khởi động server --- */
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
