import { useEffect, useState } from "react";
// Pastikan path import ini benar sesuai lokasi file kamu
import Navbar from "./components/navbar";
import Utama from "./components/utama";
import TheApp from "./components/theApp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function Layout({ children }) {
  const [open, setOpen] = useState(false); // Default false agar tertutup di Mobile

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const location = useLocation();

  // Menentukan apakah halaman saat ini adalah halaman Login/Register
  const isAuthPage = location.pathname === "/";
  // Sidebar hanya muncul jika BUKAN halaman Login
  const showSidebar = !isAuthPage;

  return (
    // overflow-x-hidden untuk mencegah scroll samping di HP
    <div className="flex min-h-screen bg-gray-50 relative overflow-x-hidden w-full">
      {/* Sidebar / Navbar Component */}
      {showSidebar && <Navbar user={user} open={open} setOpen={setOpen} />}

      {/* === KONTEN UTAMA === */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 w-full ${
          // LOGIKA RESPONSIVE:
          // Mobile: w-full (Lebar penuh, tidak ada margin kiri)
          // Desktop (md): md:ml-64 (Margin kiri selebar sidebar) jika sidebar aktif
          showSidebar ? "md:ml-64" : "w-full"
        }`}
      >
        {/* === MOBILE HEADER (Hanya muncul di HP) === */}
        {/* Header ini berisi tombol hamburger dan logo untuk tampilan mobile */}
        {showSidebar && (
          <div className="md:hidden w-full bg-gray-50 px-4 pt-4 pb-2 flex items-center justify-between sticky top-0 z-30">
            {/* Tombol Buka Sidebar */}
            <button
              className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            {/* Logo Mobile (Kanan) */}
            <span className="font-bold text-xl text-sky-500 tracking-tighter">
              ecotrace.
            </span>
          </div>
        )}

        {/* === WRAPPER CHILDREN === */}
        {/* Logika Padding: */}
        {/* Halaman Login (isAuthPage): p-0 (Full Screen tanpa jarak) */}
        {/* Halaman Dashboard: p-4 (Mobile) dan md:p-8 (Desktop) */}
        <div className={`flex-1 w-full ${isAuthPage ? "p-0" : "p-4 md:p-8"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Utama setUser={setUser} />} />
          <Route
            path="/dashboard"
            element={<TheApp page={"Dashboard"} user={user} />}
          />
          <Route
            path="/tagihan"
            element={<TheApp page={"Tagihan"} user={user} />}
          />
          <Route
            path="/riwayat"
            element={<TheApp page={"Riwayat"} user={user} />}
          />
          <Route
            path="/pengajuan"
            element={<TheApp page={"Pengajuan"} user={user} />}
          />
          <Route
            path="/profile"
            element={<TheApp page={"Profile"} user={user} />}
          />
          <Route path="/user" element={<TheApp page={"User"} user={user} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
