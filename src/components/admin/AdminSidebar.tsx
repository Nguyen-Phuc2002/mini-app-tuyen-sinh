import React from "react";
import { useNavigate } from "react-router-dom"; // Khai báo useNavigate()

interface AdminSidebarProps {
    onTabChange: (tab: string) => void; // Callback để thay đổi tab
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onTabChange }) => {
    const navigate = useNavigate(); // Khai báo useNavigate()

    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-4">Quản trị</h2>
            <ul>
                {/* Trang chủ */}
                <li>
                    <button
                        onClick={() => onTabChange("home")} // Cập nhật tab là "home"
                        className="w-full text-left p-2 hover:bg-gray-700 flex items-center"
                    >
                        <span className="mr-2">🏠</span> Trang chủ
                    </button>
                </li>

                {/* Danh sách thí sinh */}
                <li>
                    <button
                        onClick={() => onTabChange("danhSachThiSinh")} // Chuyển sang tab danh sách thí sinh
                        className="w-full text-left p-2 hover:bg-gray-700 flex items-center"
                    >
                        <span className="mr-2">👩‍🎓</span> Danh sách thí sinh
                    </button>
                </li>

                {/* Đăng xuất */}
                <li>
                    <button
                        onClick={() => {
                            localStorage.removeItem("admin"); // Xóa thông tin admin trong localStorage
                            navigate("/admin/login"); // Điều hướng về trang đăng nhập
                        }} // Xử lý đăng xuất
                        className="w-full text-left p-2 hover:bg-gray-700 flex items-center"
                    >
                        <span className="mr-2">🚪</span> Đăng xuất
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
