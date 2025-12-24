import { useState, useEffect } from "react";
import Regis from "./log-reg/regis";
import Login from "./log-reg/login";

const Utama = ({ setUser }) => {
  const [name, setName] = useState("Masuk");
  const [condition, setCon] = useState(true);

  // 1. State untuk status Loading
  const [loading, setLoading] = useState(true);

  // 2. useEffect untuk simulasi loading selama 2 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2000ms = 2 detik

    return () => clearTimeout(timer); // Membersihkan timer saat komponen di-unmount
  }, []);

  // 3. TAMPILAN LOADING (SPLASH SCREEN)
  // Jika loading=true, tampilkan layar ini dulu
  if (loading) {
    return (
      // Menggunakan bg-sky-500 agar warna biru konsisten
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-500 w-full h-screen">
        {/* Logo/Tulisan berdenyut */}
        <div className="animate-pulse flex flex-col items-center">
          {/* --- ANTI-GAGAL DEPLOY --- */}
          {/* Menggunakan style={{ fontSize: ... }} untuk memaksa ukuran teks tetap besar */}
          {/* clamp(3rem, 5vw, 5rem) artinya: Minimal 3rem, Idealnya 5vw, Maksimal 5rem */}
          <h1
            className="font-extrabold text-white mb-3 tracking-tighter drop-shadow-md font-sans"
            style={{
              fontWeight: 800,
              fontSize: "clamp(3rem, 5vw, 5rem)",
            }}
          >
            ecotrace.
          </h1>

          <p className="text-white text-sm md:text-base tracking-[0.2em] opacity-90 font-medium">
            MEMUAT APLIKASI...
          </p>
        </div>

        {/* Spinner (Lingkaran Berputar) */}
        <div className="mt-8">
          <svg
            className="animate-spin h-10 w-10 md:h-12 md:w-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  // 4. TAMPILAN UTAMA (Login/Register)
  // Muncul setelah loading selesai
  return (
    <div className="bg-nav min-h-screen animate-fade-in">
      {/* animate-fade-in opsional agar munculnya halus */}
      <div className="flex flex-col lg:flex-row justify-center items-center text-black min-h-screen">
        <div className="w-full lg:w-3/5 text-center text-amber-50 h-1/3 flex flex-col justify-center items-center lg:flex-none">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-Inter font-bold">
            ecotrace.
          </h1>
          <h3 className="text-sm md:text-md mt-2 w-4/6">
            Aplikasi Pencatat Meter Air di KSM Banyu Bening Eco Fresh
          </h3>
        </div>
        <div className="w-5/6 md:w-5/6 lg:w-2/5 mt-4 lg:mt-0 bg-white rounded-4xl lg:rounded-b-none lg:rounded-tl-xl lg:rounded-tr-none shadow-lg">
          {condition ? (
            <Login
              con={setCon}
              name={name}
              setName={setName}
              setUser={setUser}
            />
          ) : (
            <Regis con={setCon} name={name} setName={setName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Utama;
