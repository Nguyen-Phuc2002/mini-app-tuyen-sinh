import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-lg font-bold mb-4">⚙️ Admin Panel</h2>
            <ul className="space-y-3">
                <li>
                    <button onClick={() => navigate("quan-ly-tai-khoan")} className="block p-2 w-full text-left">
                        👤 Quản lý Tài khoản
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate("dang-ky-xet-tuyen")} className="block p-2 w-full text-left">
                        📂 Quản lý Đăng ký xét tuyển
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate("quan-ly-nganh-hoc")} className="block p-2 w-full text-left">
                        📘 Quản lý Ngành học
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate("quan-ly-tin-tuc")} className="block p-2 w-full text-left">
                        📰 Quản lý Tin tức
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate("quan-ly-thong-bao")} className="block p-2 w-full text-left">
                        🔔 Quản lý Thông báo
                    </button>
                </li>
                <li>
                    <button onClick={() => { localStorage.removeItem("admin"); navigate("/admin/login"); }}
                        className="block p-2 w-full text-left bg-red-600 hover:bg-red-700 rounded">
                        🚪 Đăng xuất
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
