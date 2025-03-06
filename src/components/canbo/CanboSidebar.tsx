import React from "react";
import { Link } from "react-router-dom";

const CanboSidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Cán Bộ Dashboard</h2>
      <ul className="space-y-3">
        <li>
          <Link to="/can-bo/giai-dap-thac-mac" className="block p-2 w-full text-left">
            Giải đáp thắc mắc
          </Link>
        </li>
        {/* Thêm các mục menu khác cho cán bộ */}
      </ul>
    </div>
  );
};

export default CanboSidebar;
