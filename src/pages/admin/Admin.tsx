// Desc: Admin page

import React from "react";
import DanhSachThiSinh from "./DanhSachThiSinh";

const Admin = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Quản lý thí sinh</h1>
            <DanhSachThiSinh />
        </div>
    );
};

export default Admin;
