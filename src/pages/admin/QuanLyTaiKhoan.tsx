import React, { useState, useEffect } from "react";
import { layDanhSachTaiKhoan, capNhatQuyenTaiKhoan, xoaTaiKhoan } from "../../api/api";
import "../../styles/QuanLyTaiKhoan.scss";

const QuanLyTaiKhoan = () => {
  const [taiKhoanList, setTaiKhoanList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTaiKhoanList = async () => {
      try {
        const data = await layDanhSachTaiKhoan();
        setTaiKhoanList(data);
        setLoading(false);
      } catch (error) {
        setError("Không thể tải danh sách tài khoản.");
        setLoading(false);
      }
    };

    fetchTaiKhoanList();
  }, []);

  const handleUpdatePermission = async (id: number, quyen: string) => {
    try {
      const result = await capNhatQuyenTaiKhoan(id, quyen);
      alert("Cập nhật quyền thành công!");
      setTaiKhoanList((prevList) =>
        prevList.map((taiKhoan) =>
          taiKhoan.id === id ? { ...taiKhoan, quyen } : taiKhoan
        )
      );
    } catch (error) {
      console.error("Lỗi cập nhật quyền:", error);
    }
  };

  const handleDeleteAccount = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      try {
        await xoaTaiKhoan(id);
        setTaiKhoanList((prevList) => prevList.filter((taiKhoan) => taiKhoan.id !== id));
        alert("Tài khoản đã được xóa!");
      } catch (error) {
        console.error("Lỗi xóa tài khoản:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>👤 Quản lý Tài khoản</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên Đăng Nhập</th>
                <th>Quyền</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {taiKhoanList.map((taiKhoan, index) => (
                <tr key={taiKhoan.id}>
                  <td>{index + 1}</td>
                  <td>{taiKhoan.ten_dang_nhap}</td>
                  <td>{taiKhoan.quyen}</td>
                  <td>
                    <button
                      onClick={() => handleUpdatePermission(taiKhoan.id, taiKhoan.quyen === "admin" ? "canbo" : "admin")}
                      className="edit"
                    >
                      Sửa Quyền
                    </button>
                    <button
                      onClick={() => handleDeleteAccount(taiKhoan.id)}
                      className="delete"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Thêm phần phân trang nếu cần */}
          <div className="pagination">
            <button>◀️ Trước</button>
            <span>1 / 5</span>
            <button>Sau ▶️</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyTaiKhoan;
