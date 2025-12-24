import LoginLogic from "../connection/login-logic";

const Login = ({ con, name, setName, setUser }) => {
  const { form, change, handleSubmit } = LoginLogic(setUser);

  return (
    <div className="flex items-center bg-white rounded-2xl lg:rounded-b-none lg:rounded-tl-4xl lg:rounded-tr-none px-8 py-6 w-full lg:min-h-screen h-3/6">
      <div className="flex flex-col gap-5 w-full">
        {/* --- BAGIAN LOGO (DIPERBAIKI) --- */}
        <div className="flex items-center justify-center lg:justify-start gap-3 lg:pl-6 mb-2">
          {/* Logo ITPLN */}
          {/* Masalah: Class h-16 hilang saat deploy. */}
          {/* Solusi: Tambahkan style={{ height: '4rem' }} agar ukuran terkunci paksa. */}
          <img
            src="/logoitpln.png"
            alt="Logo ITPLN"
            className="h-16 w-auto object-contain"
            style={{ height: "4rem", width: "auto" }}
          />

          {/* Logo KSM */}
          {/* Tambahkan style juga untuk jaga-jaga */}
          <img
            src="/logoksm.png"
            alt="Logo KSM"
            className="h-24 w-auto object-contain"
            style={{ height: "6rem", width: "auto" }}
          />
        </div>

        {/* Judul (Masuk / Daftar) */}
        <h1 className="lg:pl-6 font-mukta text-2xl md:text-3xl lg:text-4xl text-center lg:text-start font-bold text-navBase mb-0 lg:mb-4">
          {name}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="noHP"
            value={form.noHP}
            onChange={change}
            className="w-full lg:w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Masukkan Nomor HP"
          />
          <input
            type="password"
            name="pass"
            value={form.pass}
            onChange={change}
            className="w-full lg:w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Masukkan Password"
          />
          <div className="flex justify-center lg:justify-normal w-full gap-3">
            <button
              type="submit"
              className="bg-linear-to-br from-nav to-gray-100 w-32 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-full py-2 text-white font-bold text-md transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
            >
              Masuk
            </button>
            <button
              onClick={() => {
                con(false);
                setName("Daftar");
              }}
              className="bg-white w-32 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-full py-2 text-navBase font-bold text-md transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
              type="button"
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
