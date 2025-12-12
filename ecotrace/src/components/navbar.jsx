import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ user, open, setOpen }) => {
  const location = useLocation();
  const navi = useNavigate();

  // 1. State untuk menampilkan/menyembunyikan menu profil
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuAdmin = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tagihan", path: "/tagihan" },
    { name: "User", path: "/user" },
    { name: "Pengajuan", path: "/pengajuan" },
  ];

  const menuUser = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tagihan", path: "/tagihan" },
    { name: "Pengajuan", path: "/pengajuan" },
    { name: "Profile", path: "/profile" },
  ];

  const menus = user.role === "admin" ? menuAdmin : menuUser;

  // 2. Fungsi Logout
  const handleLogout = () => {
    // Hapus sesi penyimpanan
    sessionStorage.clear();
    localStorage.clear();

    // Arahkan ke halaman login (root)
    // Menggunakan window.location agar halaman ter-refresh bersih
    window.location.href = "/";
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg h-screen fixed top-0 
              ${open ? "left-0" : "-left-64"} w-64 
              transition-all duration-300 z-40 flex flex-col justify-between`}
      >
        {/* Bagian Atas: Logo & Menu */}
        <div>
          {/* Logo */}
          <div className="px-6 py-6 flex justify-between items-center mt-10 transition-all duration-300">
            <h1
              className="font-bold text-3xl text-navBase cursor-pointer"
              onClick={() => {
                navi("/");
              }}
            >
              ecotrace.
            </h1>

            {/* Mobile Toggle Button */}
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

          {/* Menu Items */}
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
        </div>

        {/* 3. Bagian Bawah: Profil User & Pop-up Menu */}
        <div className="relative px-6 pb-6">
          {/* --- POP-UP MENU (Mirip Screenshot) --- */}
          {showMenu && (
            <div className="absolute bottom-20 left-4 right-4 bg-white rounded-xl shadow-[0_-5px_25px_-5px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden animate-fade-in-up z-50">
              {/* Header Menu (Info User) */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50">
                <div className="bg-navBase p-2 rounded-full text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{user.nama}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>

              {/* List Menu */}
              <div className="p-1">
                {/* Tombol Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 text-sm text-red-600 transition-colors rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* --- TOMBOL TRIGGER PROFIL (Klik disini untuk buka menu) --- */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-xl transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
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
            <div className="flex-1">
              <p className="text-sm font-semibold">{user.nama}</p>
              <p className="text-xs text-gray-500">
                {user.role === "admin" ? "Admin" : "User"}
              </p>
            </div>

            {/* Icon Panah Kecil */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-4 text-gray-400 transition-transform ${
                  showMenu ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
