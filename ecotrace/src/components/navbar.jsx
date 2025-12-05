import { useState } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = ({ user, open, setOpen }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuAdmin = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tagihan", path: "/tagihan" },
    { name: "Riwayat", path: "/riwayat" },
    { name: "User", path: "/user" },
    { name: "Pengajuan", path: "/pengajuan" },
    { name: "Profile", path: "/profile" },
  ];

  const menuUser = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tagihan", path: "/tagihan" },
    { name: "Riwayat", path: "/riwayat" },
    { name: "Pengajuan", path: "/pengajuan" },
    { name: "Profile", path: "/profile" },
  ];

  const menus = user.role === "admin" ? menuAdmin : menuUser;

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg h-screen fixed top-0 
              ${open ? "left-0" : "-left-64"} w-64 
              transition-all duration-300 z-40`}
      >
        {/* Logo */}
        <div className="px-6 py-6 flex justify-between items-center mt-10 transition-all duration-300">
          <h1 className="font-bold text-3xl text-navBase">ecotrace.</h1>

          {/* Mobile Toggle */}
          {/* Floating toggle button for mobile */}
          <button
            className="fixed top-5 left-5 z-50 bg-white p-2 rounded-xl shadow-md"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <div className="mt-5 px-4 space-y-2">
          {menus.map((m) => (
            <a
              key={m.path}
              href={m.path}
              className={`
                block px-4 py-3 rounded-xl text-sm font-medium 
                ${
                  isActive(m.path)
                    ? "bg-navBase text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {m.name}
            </a>
          ))}
        </div>

        {/* User Info */}
        <div className="absolute bottom-5 px-6 flex items-center gap-3">
          <div className="bg-gray-200 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-5 text-gray-700"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold">{user.nama}</p>
            <p className="text-xs text-gray-500">
              {user.role === "admin" ? "Admin" : "User"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
