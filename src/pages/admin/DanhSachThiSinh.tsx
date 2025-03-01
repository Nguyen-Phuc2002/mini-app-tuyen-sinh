import React, { useEffect, useState } from "react";
import { layDanhSachDangKy } from "../../api/api";

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

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc muốn xóa thí sinh này?")) {
            setThiSinhList((prevList) => prevList.filter((thiSinh) => thiSinh.id !== id));
        }
    };

    // 🔍 Lọc danh sách theo tìm kiếm
    const filteredList = thiSinhList.filter((thiSinh) =>
        thiSinh.ho_ten.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 📄 Chia trang
    const paginatedList = filteredList.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(filteredList.length / pageSize);

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
                                    <td className="border p-2">{thiSinh.ten_nganh}</td>
                                    <td className="border p-2">{thiSinh.ten_phuong_thuc}</td>
                                    <td className="border p-2">{formatDate(thiSinh.ngay_dang_ky)}</td>
                                    <td className="border p-2">
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
        </div>
    );
};

export default DanhSachThiSinh;
