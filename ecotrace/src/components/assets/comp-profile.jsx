import { useState } from "react";

const CompProfile = ({ user }) => {
  const [form, setForm] = useState({
    nama: user.nama,
    noHP: user.noHP,
    passPrev: "",
    passNew: "",
    passNewConfirm: "",
    email: user.email,
    alamat: user.alamat,
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = {
      ...form,
      noHPprev: user.noHP,
      passRealPrev: user.pass,
    };

    try {
      const res = await fetch("https://api.ecotrace.id/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
      });

      const temp = await res.json();
      if (temp.succeed) {
        alert(temp.message);
      } else {
        alert(temp.message);
      }
    } catch {}
  };

  return (
    <div className="flex flex-col w-full sm:p-5 text-sm ms:text-base">
      <form onSubmit={handleSubmit} className="flex flex-col w-full sm:w-4/5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row">
            <h1 className="w-full md:w-2/6 ml-3 mb-1 md:ml-0 md:mb-0 flex items-center">
              Nama
            </h1>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={change}
              placeholder="Nama Lengkap"
              className="w-full border border-gray-400 rounded-full text-gray-800 
                   placeholder-gray-300 h-10 sm:h-11 px-4"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <h1 className="w-full md:w-2/6 ml-3 mb-1 md:ml-0 md:mb-0 flex items-center">
              Nomor Telepon
            </h1>
            <input
              type="text"
              name="noHP"
              value={form.noHP}
              onChange={change}
              placeholder="Nomor Telepon"
              className="w-full border border-gray-400 rounded-full text-gray-800 
                   placeholder-gray-300 h-10 sm:h-11 px-4"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <h1 className="w-full md:w-2/6 ml-3 mb-1 md:ml-0 md:mb-0 flex items-center">
              Email
            </h1>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={change}
              placeholder="example@gmail.com"
              className="w-full border border-gray-400 rounded-full text-gray-800 
                   placeholder-gray-300 h-10 sm:h-11 px-4"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <h1 className="w-full md:w-2/6 ml-3 mb-1 md:ml-0 md:mb-0 flex items-center">
              Password Lama
            </h1>
            <input
              type="password"
              name="passPrev"
              value={form.passPrev}
              onChange={change}
              placeholder="Masukkan Password Lama"
              className="w-full border border-gray-400 rounded-full text-gray-800 
                   placeholder-gray-300 h-10 sm:h-11 px-4"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <h1 className="w-full md:w-2/6 ml-3 mb-1 md:ml-0 md:mb-0 flex items-center">
              Password Baru
            </h1>
            <input
              type="password"
              name="passNew"
              value={form.passNew}
              onChange={change}
              placeholder="Masukkan Password Baru"
              className="w-full border border-gray-400 rounded-full text-gray-800 
                   placeholder-gray-300 h-10 sm:h-11 px-4"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <h1 className="w-full md:w-2/6 ml-3 mb-1 md:ml-0 md:mb-0 flex items-center">
              Re-Type Password
            </h1>
            <input
              type="password"
              name="passNewConfirm"
              value={form.passNewConfirm}
              onChange={change}
              placeholder="Ketikan Ulang Password"
              className="w-full border border-gray-400 rounded-full text-gray-800 
                   placeholder-gray-300 h-10 sm:h-11 px-4"
            />
          </div>

          <h1
            className={`${
              form.passNew.length < 8
                ? form.passNew.length === 0
                  ? "text-gray-300"
                  : "text-red-500"
                : "text-green-500"
            } text-sm text-gray-400`}
          >
            {form.passNew.length < 8
              ? "Password harus 8 karakter"
              : "Password Sesuai :)"}
          </h1>
          <h1
            className={`${
              form.passNewConfirm === form.passNew
                ? "text-green-500"
                : "text-red-500"
            } text-sm`}
          >
            {form.passNewConfirm.length > 0
              ? form.passNewConfirm === form.passNew
                ? "Password Sudah Sama :)"
                : "Password Tidak Sama !"
              : ""}
          </h1>
          <div className="flex flex-col md:flex-row">
            <h1 className="w-full md:w-2/6 ml-3 mb-1 md:ml-0 md:mb-0 flex items-center">
              Alamat
            </h1>
            <textarea
              name="alamat"
              value={form.alamat}
              onChange={change}
              placeholder="Alamat"
              className="w-full border border-gray-400 rounded-lg text-gray-800 
                   placeholder-gray-300 h-24 px-4 py-2"
            ></textarea>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-linear-to-br from-nav to-gray-100 w-40 shadow-lg rounded-full py-2 text-white font-bold text-md transition transform hover:-translate-y-0.5"
            >
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompProfile;
