import { useState } from "react";

const CompProfile = ({ user }) => {
  const [form, setForm] = useState({
    nama: user.nama,
    noHP: user.noHP,
    pass: "",
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
      passprev: user.pass,
    };

    try {
      const res = await fetch("/api/update-profile", {
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
    <div
      className="flex flex-col justify-center items-center 
                  w-full sm:w-3/4 md:w-2/3 lg:w-2/5 
                  p-3 sm:p-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        className="text-gray-500 mb-3 sm:mb-5"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      </svg>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full sm:w-4/5"
      >
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={change}
          placeholder="Nama Lengkap"
          className="w-full border border-gray-400 rounded-full text-gray-800 
                   placeholder-gray-300 h-10 sm:h-11 px-4"
        />

        <input
          type="text"
          name="noHP"
          value={form.noHP}
          onChange={change}
          placeholder="Nomor Telepon"
          className="w-full border border-gray-400 rounded-full text-gray-800 
                   placeholder-gray-300 h-10 sm:h-11 px-4"
        />

        <input
          type="text"
          name="pass"
          value={form.pass}
          onChange={change}
          placeholder="Password"
          className="w-full border border-gray-400 rounded-full text-gray-800 
                   placeholder-gray-300 h-10 sm:h-11 px-4"
        />

        <textarea
          name="alamat"
          value={form.alamat}
          onChange={change}
          placeholder="Alamat"
          className="w-full border border-gray-400 rounded-lg text-gray-800 
                   placeholder-gray-300 h-24 px-4 py-2"
        ></textarea>

        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="bg-linear-to-br from-nav to-gray-100 w-40 shadow-lg 
                     rounded-full py-2 text-white font-bold text-md 
                     transition transform hover:-translate-y-0.5"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompProfile;
