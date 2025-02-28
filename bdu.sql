-- Tạo database
CREATE DATABASE mini_app_tuyen_sinh;
USE mini_app_tuyen_sinh;
	
-- Bảng tài khoản (Hỗ trợ phân quyền admin và user)
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_dang_nhap VARCHAR(50) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL
);


-- Bảng ngành học
CREATE TABLE IF NOT EXISTS nganh_hoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_nganh VARCHAR(255) NOT NULL UNIQUE,
    ma_nganh VARCHAR(20) NOT NULL UNIQUE
);

-- Bảng phương thức xét tuyển
CREATE TABLE IF NOT EXISTS phuong_thuc_xet_tuyen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_phuong_thuc VARCHAR(255) UNIQUE NOT NULL
);

-- Bảng đăng ký xét tuyển 
CREATE TABLE IF NOT EXISTS dang_ky_xet_tuyen (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ho_ten VARCHAR(255) NOT NULL,
    ngay_sinh DATE NOT NULL,
    gioi_tinh ENUM('Nam', 'Nữ', 'Khác') NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    so_dien_thoai VARCHAR(15) NOT NULL,
    cmnd VARCHAR(20) UNIQUE NOT NULL,
    nam_tot_nghiep INT NOT NULL,
    tinh_thanh VARCHAR(255) NOT NULL,
    truong_thpt VARCHAR(255) NOT NULL,
    ten_phuong_thuc VARCHAR(255) NOT NULL,
    ten_nganh VARCHAR(255) NOT NULL,
    ngay_dang_ky TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_phuong_thuc FOREIGN KEY (ten_phuong_thuc) REFERENCES phuong_thuc_xet_tuyen(ten_phuong_thuc) ON DELETE CASCADE,
    CONSTRAINT fk_nganh_hoc FOREIGN KEY (ten_nganh) REFERENCES nganh_hoc(ten_nganh) ON DELETE CASCADE
);

-- Bảng tin tức
CREATE TABLE IF NOT EXISTS tin_tuc (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tieu_de VARCHAR(255) NOT NULL,
    noi_dung TEXT NOT NULL,
    duong_dan_anh VARCHAR(255),
    link VARCHAR(255),
    ngay_dang TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Bảng thông báo
CREATE TABLE IF NOT EXISTS thong_bao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tieu_de VARCHAR(255) NOT NULL,
    noi_dung TEXT NOT NULL,
    ngay_gui TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    loai ENUM('user', 'admin', 'tat_ca') DEFAULT 'tat_ca'
);

-- Bảng hình ảnh
CREATE TABLE IF NOT EXISTS hinh_anh (
    id INT AUTO_INCREMENT PRIMARY KEY,
    duong_dan_anh VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Bảng tài khoản (Admin)
INSERT INTO admin (ten_dang_nhap, mat_khau) VALUES ('admin', '123456');



-- Bảng ngành học
INSERT INTO nganh_hoc (ten_nganh, ma_nganh) VALUES
('Quản trị Kinh Doanh', '7340101'),
('Tài Chính - Ngân Hàng', '7340201'),
('Kế Toán', '7340301'),
('Luật', '7380101'),
('Luật Kinh Tế', '7380107'),
('Công Nghệ Thông Tin', '7480201'),
('Dược Học', '7720201'),
('Hóa Dược', '7720203'),
('Logistics và Quản lý Chuỗi Cung Ứng', '7510605'),
('Ngôn Ngữ Anh', '7220201'),
('Nhật Bản Học', '7310613'),
('Hàn Quốc Học', '7310614'),
('Công Nghệ Thực Phẩm', '7540101'),
('Công Nghệ Kỹ Thuật Điện, Điện Tử', '7510301'),
('Công Nghệ Kỹ Thuật Ô Tô', '7510205'),
('Công Nghệ Kỹ Thuật Công Trình Xây Dựng', '7510102'),
('Kiến Trúc', '7580101'),
('Xã Hội Học', '7310301');


-- Bảng tin tức
INSERT INTO tin_tuc (tieu_de, noi_dung, duong_dan_anh, link) VALUES
('CỰU SINH VIÊN PHẠM NHÃ LINH TÌNH NGUYỆN NHẬP NGŨ ĐỂ RÈN MÌNH VÀ PHỤC VỤ TỔ QUỐC', 'Tốt nghiệp loại khá ngành Tài chính ngân hàng tại Phân hiệu trường Đại học Bình Dương tại Cà Mau (Phân hiệu), cơ hội việc làm đang rất rộng mở với một tân cử nhân nhưng cựu sinh viên Nguyễn Nhã Linh đã tình nguyện nhập ngũ để rèn mình và phục vụ tổ quốc.', 'src/assets/tin_tuc1.jpg', 'https://camau.bdu.edu.vn/index.php/tin-tuc-su-kien/cuu-sinh-vien-nguyen-nha-linh-tinh-nguyen-nhap-ngu-de-ren-minh-va-phuc-vu-to-quoc-542.html'),
('NGÀY THƠ VIỆT NAM LẦN THỨ 23: LẮNG ĐỌNG VÀ GIÀU CẢM XÚC', 'Tối ngày 12/02 vừa qua, Hội Văn học - Nghệ thuật tỉnh Cà Mau phối hợp cùng Phân hiệu trường Đại học Bình Dương tại Cà Mau tổ chức Ngày Thơ Việt Nam lần thứ 23 Đêm thơ nguyên tiêu với chủ đề “Thơ ca hòa điệu”.', 'src/assets/tin_tuc2.jpg', 'https://camau.bdu.edu.vn/index.php/tin-tuc-su-kien/ngay-tho-viet-nam-lan-thu-23-lang-dong-va-giau-cam-xuc-541.html'),
('HỌP MẶT TÂN NIÊN – KHỞI ĐẦU NĂM MỚI 2025', '🎋 Trở lại sau kì nghỉ Tết khá dài, BDU Cà Mau đã có buổi gặp gỡ đầu xuân vào mùng 6 (ÂL) vừa qua với sự tham gia của đông đảo thầy cô để khởi động năm 2025 nhiều năng lượng và hy vọng mới.', 'src/assets/tin_tuc3.jpg', 'https://camau.bdu.edu.vn/index.php/tin-tuc-su-kien/hop-mat-tan-nien-khoi-dau-nam-moi-2025-536.html'),
('YEAR END PARTY 2024 - DẤU ẤN THÀNH CÔNG CỦA BDU CÀ MAU', '🎋 Tối ngày 24/01, BDU Cà Mau đã tổ chức tiệc tổng kết năm 2024 tại Phân hiệu. Đây là dịp để Ban lãnh đạo và toàn thể cán bộ nhân viên, giảng viên cùng nhìn lại dấu ấn phát triển trong năm 2024 và hướng tới chặng đường 2025 đầy những cơ hội mới.', 'src/assets/tin_tuc4.jpg', 'https://camau.bdu.edu.vn/index.php/tin-tuc-su-kien/year-end-party-2024-dau-an-thanh-cong-cua-bdu-ca-mau-535.html');


-- Bảng thông báo (Gửi đến User & Admin)
INSERT INTO thong_bao (tieu_de, noi_dung, loai) VALUES
('Chào mừng tân sinh viên', 'Chào mừng các tân sinh viên nhập học năm 2025!', 'user'),
('Cập nhật hệ thống', 'Admin vui lòng kiểm tra hệ thống xét tuyển.', 'admin');

INSERT INTO hinh_anh (duong_dan_anh)
VALUES ('src/assets/banner1.jpg');

INSERT INTO phuong_thuc_xet_tuyen (ten_phuong_thuc) VALUES
('Điểm trung bình cao nhất các môn học lớp 10, 11, 12'),
('Kết quả thi đánh giá năng lực'),
('Kết quả học tập năm lớp 12'),
('Kết quả học tập 3 năm lớp 10, 11, 12'),
('Kết quả kỳ thi tốt nghiệp THPT');

select * from hinh_anh;







