import React, { useEffect, useState } from "react";
import { layDanhSachDangKy } from "../../api/api"; // API để lấy danh sách thí sinh
import * as XLSX from "xlsx"; // Import thư viện SheetJS

interface ThiSinh {
    id: number;
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
    ngay_dang_ky: string;
}

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const QuanLyDangKy = () => {
    const [thiSinhList, setThiSinhList] = useState<ThiSinh[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 Tìm kiếm
    const [page, setPage] = useState(1); // 📄 Phân trang
    const pageSize = 5; // Số thí sinh mỗi trang
    const [editingThiSinh, setEditingThiSinh] = useState<ThiSinh | null>(null); // Thí sinh đang được sửa

    useEffect(() => {
        layDanhSachDangKy()
            .then((data) => {
                setThiSinhList(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Không thể tải danh sách thí sinh.");
                setLoading(false);
            });
    }, []);

    // 🔍 Lọc danh sách theo tìm kiếm
    const filteredList = thiSinhList.filter((thiSinh) =>
        thiSinh.ho_ten.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 📄 Chia trang
    const paginatedList = filteredList.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(filteredList.length / pageSize);

    // Hàm xuất danh sách thí sinh ra file Excel
    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(thiSinhList); // Chuyển đổi danh sách thí sinh thành sheet Excel
        const wb = XLSX.utils.book_new(); // Tạo workbook mới
        XLSX.utils.book_append_sheet(wb, ws, "Danh sách thí sinh"); // Thêm sheet vào workbook
        XLSX.writeFile(wb, "Danh_Sach_Thi_Sinh.xlsx"); // Tải xuống file Excel
    };

    // Hàm xử lý khi xóa thí sinh
    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc muốn xóa thí sinh này?")) {
            // Gọi API xóa thí sinh hoặc xử lý xóa ở đây
            setThiSinhList((prevList) => prevList.filter((thiSinh) => thiSinh.id !== id));
        }
    };

    // Hàm mở modal để sửa thí sinh
    const handleEdit = (thiSinh: ThiSinh) => {
        setEditingThiSinh({ ...thiSinh }); // Lưu thông tin thí sinh cần sửa
    };

    // Hàm lưu thay đổi sau khi sửa thông tin thí sinh
    const handleSaveEdit = () => {
        if (editingThiSinh) {
            setThiSinhList((prevList) =>
                prevList.map((thiSinh) =>
                    thiSinh.id === editingThiSinh.id ? editingThiSinh : thiSinh
                )
            );
            setEditingThiSinh(null); // Đóng modal
            alert("Cập nhật thành công!");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Quản lý Đăng ký xét tuyển</h1>

            {/* 🔍 Ô tìm kiếm */}
            <input
                type="text"
                placeholder="Tìm kiếm theo tên..."
                className="p-2 border rounded mb-4 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading ? (
                <p className="text-blue-500">Đang tải...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">#</th>
                                <th className="border p-2">Họ Tên</th>
                                <th className="border p-2">Ngày Sinh</th>
                                <th className="border p-2">Giới Tính</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">SĐT</th>
                                <th className="border p-2">CCCD/CMND</th>
                                <th className="border p-2">NĂM TỐT NGHIỆP</th>
                                <th className="border p-2">Ngành</th>
                                <th className="border p-2">Phương Thức</th>
                                <th className="border p-2">Ngày Đăng Ký</th>
                                <th className="border p-2">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedList.map((thiSinh, index) => (
                                <tr key={thiSinh.id} className="text-center">
                                    <td className="border p-2">{index + 1 + (page - 1) * pageSize}</td>
                                    <td className="border p-2">{thiSinh.ho_ten}</td>
                                    <td className="border p-2">{formatDate(thiSinh.ngay_sinh)}</td>
                                    <td className="border p-2">{thiSinh.gioi_tinh}</td>
                                    <td className="border p-2">{thiSinh.email}</td>
                                    <td className="border p-2">{thiSinh.so_dien_thoai}</td>
                                    <td className="border p-2">{thiSinh.cmnd}</td>
                                    <td className="border p-2">{thiSinh.nam_tot_nghiep}</td>
                                    <td className="border p-2">{thiSinh.ten_nganh}</td>
                                    <td className="border p-2">{thiSinh.ten_phuong_thuc}</td>
                                    <td className="border p-2">{formatDate(thiSinh.ngay_dang_ky)}</td>
                                    <td className="border p-2">
                                        {/* Nút Sửa */}
                                        <button
                                            onClick={() => handleEdit(thiSinh)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Sửa
                                        </button>
                                        {/* Nút Xóa */}
                                        <button
                                            onClick={() => handleDelete(thiSinh.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 📄 Nút phân trang */}
                    <div className="flex justify-center mt-4">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-4 py-2 border rounded mx-1"
                        >
                            ◀️ Trước
                        </button>
                        <span className="px-4 py-2">{page} / {totalPages}</span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-4 py-2 border rounded mx-1"
                        >
                            Sau ▶️
                        </button>
                        {/* Nút xuất Excel */}
                        <button
                            onClick={handleExportExcel}
                            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                        >
                            Xuất Excel
                        </button>
                    </div>
                </>
            )}

            {/* Modal Sửa Thí Sinh */}
            {editingThiSinh && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa thí sinh</h2>
                        <form>
                            {/* Họ và tên */}
                            <div className="mb-4">
                                <label htmlFor="ho_ten" className="block mb-2">Họ Tên</label>
                                <input
                                    type="text"
                                    id="ho_ten"
                                    className="p-2 border rounded w-full"
                                    value={editingThiSinh.ho_ten}
                                    onChange={(e) => setEditingThiSinh({ ...editingThiSinh, ho_ten: e.target.value })}
                                />
                            </div>

                            {/* Ngày sinh */}
                            <div className="mb-4">
                                <label htmlFor="ngay_sinh" className="block mb-2">Ngày Sinh</label>
                                <input
                                    type="date"
                                    id="ngay_sinh"
                                    className="p-2 border rounded w-full"
                                    value={editingThiSinh.ngay_sinh}
                                    onChange={(e) => setEditingThiSinh({ ...editingThiSinh, ngay_sinh: e.target.value })}
                                />
                            </div>

                            {/* Giới tính */}
                            {/* <div className="mb-4">
                            <label htmlFor="gioi_tinh" className="block mb-2">Giới Tính</label>
                            <select
                                id="gioi_tinh"
                                className="p-2 border rounded w-full"
                                value={editingThiSinh.gioi_tinh}
                                onChange={(e) => setEditingThiSinh({ ...editingThiSinh, gioi_tinh: e.target.value })}
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                            </div> */}

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="p-2 border rounded w-full"
                                    value={editingThiSinh.email}
                                    onChange={(e) => setEditingThiSinh({ ...editingThiSinh, email: e.target.value })}
                                />
                            </div>

                            {/* Số điện thoại */}
                            {/* <div className="mb-4">
                            <label htmlFor="so_dien_thoai" className="block mb-2">Số điện thoại</label>
                            <input
                                type="text"
                                id="so_dien_thoai"
                                className="p-2 border rounded w-full"
                                value={editingThiSinh.so_dien_thoai}
                                onChange={(e) => setEditingThiSinh({ ...editingThiSinh, so_dien_thoai: e.target.value })}
                            />
                            </div> */}

                            {/* CMND/CCCD */}
                            <div className="mb-4">
                                <label htmlFor="cmnd" className="block mb-2">CMND/CCCD</label>
                                <input
                                    type="text"
                                    id="cmnd"
                                    className="p-2 border rounded w-full"
                                    value={editingThiSinh.cmnd}
                                    onChange={(e) => setEditingThiSinh({ ...editingThiSinh, cmnd: e.target.value })}
                                />
                            </div>

                            {/* Năm tốt nghiệp */}
                            {/* <div className="mb-4">
                            <label htmlFor="nam_tot_nghiep" className="block mb-2">Năm Tốt Nghiệp</label>
                            <input
                                type="number"
                                id="nam_tot_nghiep"
                                className="p-2 border rounded w-full"
                                value={editingThiSinh.nam_tot_nghiep}
                                onChange={(e) => setEditingThiSinh({ ...editingThiSinh, nam_tot_nghiep: Number(e.target.value) })}
                            />
                            </div> */}

                            {/* Tỉnh/Thành phố */}
                            {/* <div className="mb-4">
                            <label htmlFor="tinh_thanh" className="block mb-2">Tỉnh/Thành phố</label>
                            <input
                                type="text"
                                id="tinh_thanh"
                                className="p-2 border rounded w-full"
                                value={editingThiSinh.tinh_thanh}
                                onChange={(e) => setEditingThiSinh({ ...editingThiSinh, tinh_thanh: e.target.value })}
                            />
                            </div> */}

                            {/* Trường THPT */}
                            {/* <div className="mb-4">
                            <label htmlFor="truong_thpt" className="block mb-2">Trường THPT</label>
                            <input
                                type="text"
                                id="truong_thpt"
                                className="p-2 border rounded w-full"
                                value={editingThiSinh.truong_thpt}
                                onChange={(e) => setEditingThiSinh({ ...editingThiSinh, truong_thpt: e.target.value })}
                            />
                            </div> */}

                            {/* Ngành học */}
                            <div className="mb-4">
                                <label htmlFor="ten_nganh" className="block mb-2">Ngành học</label>
                                <input
                                    type="text"
                                    id="ten_nganh"
                                    className="p-2 border rounded w-full"
                                    value={editingThiSinh.ten_nganh}
                                    onChange={(e) => setEditingThiSinh({ ...editingThiSinh, ten_nganh: e.target.value })}
                                />
                            </div>

                            {/* Phương thức xét tuyển */}
                            <div className="mb-4">
                                <label htmlFor="ten_phuong_thuc" className="block mb-2">Phương thức xét tuyển</label>
                                <input
                                    type="text"
                                    id="ten_phuong_thuc"
                                    className="p-2 border rounded w-full"
                                    value={editingThiSinh.ten_phuong_thuc}
                                    onChange={(e) => setEditingThiSinh({ ...editingThiSinh, ten_phuong_thuc: e.target.value })}
                                />
                            </div>

                            {/* Nút lưu và hủy */}
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleSaveEdit}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Lưu
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingThiSinh(null)} // Đóng modal
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuanLyDangKy;
