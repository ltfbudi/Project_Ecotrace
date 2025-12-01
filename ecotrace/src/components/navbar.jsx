import { useState } from "react";

const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {user.role === "admin" ? (
        <nav className="bg-white sticky top-0 left-0 w-full shadow-md shadow-gray-400 px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a
              href="/"
              className="font-bold font-Inter text-navBase text-3xl sm:text-4xl"
            >
              ecotrace.
            </a>

            {/* Menu Desktop Admin */}
            <div className="hidden md:flex justify-end items-center gap-9 text-lg font-Inter text-nav">
              <a href="/dashboard" className="text-sm">
                Dashboard
              </a>
              <a href="/tagihan" className="text-sm">
                Tagihan
              </a>
              <a href="/riwayat" className="text-sm">
                Riwayat
              </a>
              <a href="/user" className="text-sm">
                User
              </a>
              <a href="/pengajuan" className="text-sm">
                Pengajuan
              </a>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4 text-icon"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <a href="/profile" className="text-center text-sm">
                  {user.nama} <br />
                  {user.role === "user" ? "" : "Admin"}
                </a>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-nav"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {open && (
            <div className="md:hidden flex flex-col gap-5 pb-5 text-lg font-Inter text-nav">
              <a href="/dashboard" className="border-b pb-2 text-sm">
                Dashboard
              </a>
              <a href="/tagihan" className="border-b pb-2 text-sm">
                Tagihan
              </a>
              <a href="/riwayat" className="border-b pb-2 text-sm">
                Riwayat
              </a>
              <a href="/user" className="border-b pb-2 text-sm">
                User
              </a>
              <a
                href="/profile"
                className="flex items-center gap-2 text-center text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4 text-icon"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                {user.nama} <br />
                {user.role === "user" ? "" : "Admin"}
              </a>
            </div>
          )}
        </nav>
      ) : (
        <nav className="bg-white sticky top-0 left-0 w-full shadow-md shadow-gray-400 px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a
              href="/"
              className="font-bold font-Inter text-navBase text-3xl sm:text-4xl"
            >
              ecotrace.
            </a>

            {/* Menu Desktop User */}
            <div className="hidden md:flex justify-end items-center gap-7 text-lg font-Inter text-nav">
              <a href="/dashboard" className="text-sm">
                Dashboard
              </a>
              <a href="/tagihan" className="text-sm">
                Tagihan
              </a>
              <a href="/riwayat" className="text-sm">
                Riwayat
              </a>
              <a href="/pengajuan" className="text-sm">
                Pengajuan
              </a>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4 text-icon"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <a href="/profile" className="text-center text-sm">
                  {user.nama} <br />
                  {user.role === "user" ? "" : "Admin"}
                </a>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-nav"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {open && (
            <div className="md:hidden flex flex-col gap-5 pb-5 text-lg font-Inter text-nav">
              <a href="/dashboard" className="border-b pb-2 text-sm">
                Dashboard
              </a>
              <a href="/tagihan" className="border-b pb-2 text-sm">
                Tagihan
              </a>
              <a href="/riwayat" className="border-b pb-2 text-sm">
                Riwayat
              </a>
              <a href="/pengajuan" className="border-b pb-2 text-sm">
                Pengajuan
              </a>
              <a
                href="/profile"
                className="flex items-center gap-2 text-center text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4 text-icon"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                {user.nama} <br />
                {user.role === "user" ? "" : "Admin"}
              </a>
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default Navbar;
