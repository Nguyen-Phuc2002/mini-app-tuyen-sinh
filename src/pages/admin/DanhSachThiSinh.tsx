import { useEffect, useState } from "react";
import { getDanhSachThiSinh } from "../../api/api";
import React from "react";

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

const DanhSachThiSinh = () => {
    const [thiSinhList, setThiSinhList] = useState<ThiSinh[]>([]);

    useEffect(() => {
        getDanhSachThiSinh().then((data) => {
            setThiSinhList(data);
        });
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách thí sinh</h1>
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
                    </tr>
                </thead>
                <tbody>
                    {thiSinhList.map((thiSinh, index) => (
                        <tr key={thiSinh.id} className="text-center">
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{thiSinh.ho_ten}</td>
                            <td className="border p-2">{thiSinh.ngay_sinh}</td>
                            <td className="border p-2">{thiSinh.gioi_tinh}</td>
                            <td className="border p-2">{thiSinh.email}</td>
                            <td className="border p-2">{thiSinh.so_dien_thoai}</td>
                            <td className="border p-2">{thiSinh.ten_nganh}</td>
                            <td className="border p-2">{thiSinh.ten_phuong_thuc}</td>
                            <td className="border p-2">{thiSinh.ngay_dang_ky}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DanhSachThiSinh;
