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
    <div className="flex flex-col justify-center items-center w-2/5 p-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="150"
        fill="currentColor"
        className="bi bi-person-fill text-gray-500"
        viewBox="0 0 16 16"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      </svg>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-4/5">
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={change}
          placeholder="Nama Lengkap"
          className="w-full border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-8 px-5 focus:rounded-full focus:outline-gray-500"
        />
        <input
          type="text"
          name="noHP"
          value={form.noHP}
          onChange={change}
          placeholder="Nomor Telepon"
          className="w-full border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-8 px-5 focus:rounded-full focus:outline-gray-500"
        />
        <input
          type="text"
          name="pass"
          value={form.pass}
          onChange={change}
          placeholder="Password"
          className="w-full border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-8 px-5 focus:rounded-full focus:outline-gray-500"
        />
        <textarea
          name="alamat"
          value={form.alamat}
          onChange={change}
          placeholder="Alamat"
          className="w-full border border-gray-400 rounded-lg text-gray-800 placeholder-gray-300 h-20 px-5 focus:rounded-lg focus:outline-gray-500"
        />
        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="bg-linear-to-br from-nav to-gray-100 w-32 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-full py-2 text-white font-bold text-md transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
          >
            simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompProfile;
