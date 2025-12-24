import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ user, open, setOpen }) => {
  const location = useLocation();
  const navi = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Tutup sidebar otomatis saat pindah halaman (khusus mobile)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  }, [location, setOpen]);

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

  const menus = user?.role === "admin" ? menuAdmin : menuUser;

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* Overlay Gelap (Backdrop) */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar Container */}
      <div
        className={`bg-white shadow-xl h-screen fixed top-0 left-0 z-50 w-64 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          <div className="px-6 py-6 flex justify-between items-center">
            <h1
              className="font-bold text-3xl text-navBase cursor-pointer tracking-tighter"
              onClick={() => navi("/")}
            >
              ecotrace.
            </h1>
            {/* Tombol Close (X) di dalam Sidebar */}
            <button
              className="md:hidden text-gray-500 hover:text-red-500 transition-colors"
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 px-4 space-y-2">
            {menus.map((m) => (
              <div
                key={m.path}
                onClick={() => navi(m.path)}
                className={`
                  block px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200
                  ${
                    isActive(m.path)
                      ? "bg-navBase text-white shadow-md shadow-teal-500/20"
                      : "text-gray-600 hover:bg-gray-50 hover:text-navBase"
                  }
                `}
              >
                {m.name}
              </div>
            ))}
          </div>
        </div>

        {/* Bagian Profil Bawah */}
        <div className="relative px-4 pb-6">
          {/* Menu Logout Pop-up */}
          <div
            className={`absolute bottom-20 left-4 right-4 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 origin-bottom ${
              showMenu
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <div className="p-3 bg-gray-50 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase">
                Akun Anda
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 text-sm text-red-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
              Keluar Aplikasi
            </button>
          </div>

          {/* Trigger Profil */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-xl transition-colors border border-transparent hover:border-gray-200"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="bg-gradient-to-tr from-teal-500 to-emerald-400 p-2 rounded-full text-white shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">
                {user?.nama || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || "Guest"}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 text-gray-400 transition-transform ${
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
    </>
  );
};

export default Sidebar;
