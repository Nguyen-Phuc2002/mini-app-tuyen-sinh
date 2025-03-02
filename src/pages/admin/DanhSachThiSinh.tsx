import React, { useEffect, useState } from "react";
import { layDanhSachDangKy } from "../../api/api"; // API để lấy danh sách thí sinh

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

const DanhSachThiSinh = () => {
    const [thiSinhList, setThiSinhList] = useState<ThiSinh[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 Tìm kiếm
    const [page, setPage] = useState(1); // 📄 Phân trang
    const [selectedThiSinh, setSelectedThiSinh] = useState<ThiSinh | null>(null); // Thí sinh đang chọn sửa
    const [showEditModal, setShowEditModal] = useState(false); // Hiển thị modal sửa
    const pageSize = 5; // Số thí sinh mỗi trang

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

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc muốn xóa thí sinh này?")) {
            // Gọi API xóa thí sinh hoặc xử lý xóa ở đây
            setThiSinhList((prevList) => prevList.filter((thiSinh) => thiSinh.id !== id));
        }
    };

    const handleEdit = (thiSinh: ThiSinh) => {
        setSelectedThiSinh(thiSinh); // Lưu thí sinh cần sửa
        setShowEditModal(true); // Hiển thị modal sửa
    };

    const handleSaveEdit = () => {
        if (selectedThiSinh) {
            // Cập nhật thông tin thí sinh trong danh sách (bạn có thể gửi API PUT để cập nhật vào cơ sở dữ liệu)
            setThiSinhList((prevList) =>
                prevList.map((thiSinh) =>
                    thiSinh.id === selectedThiSinh.id ? selectedThiSinh : thiSinh
                )
            );
            setShowEditModal(false); // Đóng modal
            alert("Cập nhật thành công!");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách thí sinh</h1>

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
                    </div>
                </>
            )}

            {/* Modal Sửa Thí Sinh */}
            {showEditModal && selectedThiSinh && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa thí sinh</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="ho_ten" className="block mb-2">Họ Tên</label>
                                <input
                                    type="text"
                                    id="ho_ten"
                                    className="p-2 border rounded w-full"
                                    value={selectedThiSinh.ho_ten}
                                    onChange={(e) => setSelectedThiSinh({ ...selectedThiSinh, ho_ten: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="p-2 border rounded w-full"
                                    value={selectedThiSinh.email}
                                    onChange={(e) => setSelectedThiSinh({ ...selectedThiSinh, email: e.target.value })}
                                />
                            </div>
                            {/* Thêm các trường cần thiết cho thí sinh ở đây */}
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
                                    onClick={() => setShowEditModal(false)}
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

export default DanhSachThiSinh;
