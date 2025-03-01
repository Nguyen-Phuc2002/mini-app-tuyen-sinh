import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
            <h2 className="text-xl font-bold mb-4">Quản trị</h2>
            <ul>
                <li className="mb-2">
                    <Link to="/admin" className="block p-2 hover:bg-gray-700">🏠 Trang chủ</Link>
                </li>
                <li className="mb-2">
                    <Link to="/admin/thi-sinh" className="block p-2 hover:bg-gray-700">📋 Danh sách thí sinh</Link> {/* ✅ Sửa đúng đường dẫn */}
                </li>
                <li>
                    <button
                        onClick={() => {
                            localStorage.removeItem("admin");
                            window.location.href = "/admin/login";
                        }}
                        className="w-full text-left p-2 hover:bg-red-600"
                    >
                        🚪 Đăng xuất
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
