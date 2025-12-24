import { useState } from "react";

const RegAdm = ({ setCreate }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const options = [
    { label: "Pilih Kategori", value: "" }, // Opsi default / placeholder
    { label: "Anggota KSM", value: "KSM" },
    { label: "Rumah Tangga", value: "RT" },
  ];
  const [form, setForm] = useState({
    noHP: "",
    nama: "",
    pass: "",
    passConfirm: "",
    email: "",
    alamat: "",
    id_pel: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setSelectedValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = {
      ...form,
      clasify: selectedValue,
    };

    const res = await fetch(
      "https://api.ecotrace.id/api/registradi-dari-admin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
      }
    );

    const temp = await res.json();

    if (temp.succeed) {
      const res2 = await fetch(
        "https://api.ecotrace.id/api/tambah-pemakaian-akhir",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_pel: newForm.id_pel }),
        }
      );

      const temp2 = await res2.json();
      if (temp2.succeed) {
        alert("Berhasil Buat Akun Pengguna!");
        window.location.reload();
      } else {
        alert("Error");
      }
    } else {
      alert("Gagal");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto py-6">
      <div className="max-h-[400px] overflow-y-auto bg-white w-11/12 sm:w-4/5 md:w-3/5 lg:w-2/5 px-6 py-5 rounded-xl shadow-lg text-sm">
        <div className="flex justify-end mb-2">
          <button onClick={() => setCreate(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-x text-gray-500"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>

        <h1 className="text-xl text-center text-navBase font-bold font-Inter mb-3">
          Membuat Pengguna Baru
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 font-Inter"
        >
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={change}
            className="w-full border border-gray-400 rounded-md text-gray-800 placeholder-gray-300 h-8 px-5 focus:rounded-md focus:outline-gray-500"
            placeholder="Nama Lengkap"
          />
          <input
            type="password"
            name="pass"
            value={form.pass}
            onChange={change}
            className="w-full border border-gray-400 rounded-md text-gray-800 placeholder-gray-300 h-8 px-5 focus:rounded-md focus:outline-gray-500"
            placeholder="Kata Sandi"
          />

          <input
            type="password"
            name="passConfirm"
            value={form.passConfirm}
            onChange={change}
            className="w-full border border-gray-400 rounded-md text-gray-800 placeholder-gray-300 h-8 px-5 focus:rounded-md focus:outline-gray-500"
            placeholder="Confirm Kata Sandi"
          />
          <h1
            className={`${
              form.pass.length > 7 ? "text-green-500" : "text-gray-300"
            } pl-5 text-sm`}
          >
            {form.pass.length > 7
              ? "Password memenuhi standar :)"
              : "Password harus 8 - 16 karakter"}
          </h1>
          <h1
            className={`${
              form.passConfirm.length < 1 ? "hidden" : ""
            } pl-5 text-sm ${
              form.pass === form.passConfirm ? "text-green-500" : "text-red-500"
            }`}
          >
            {form.pass === form.passConfirm
              ? "Password Cocok!"
              : "Password Tidak Cocok!"}
          </h1>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={change}
            className="w-full border border-gray-400 rounded-md text-gray-800 placeholder-gray-300 h-8 px-5 focus:rounded-md focus:outline-gray-500"
            placeholder="example@gmail.com"
          />
          <input
            type="text"
            name="noHP"
            value={form.noHP}
            onChange={change}
            className="w-full border border-gray-400 rounded-md text-gray-800 placeholder-gray-300 h-8 px-5 focus:rounded-md focus:outline-gray-500"
            placeholder="Nomor Telepon"
          />
          <input
            type="text"
            name="id_pel"
            value={form.id_pel}
            onChange={change}
            className="w-full border border-gray-400 rounded-md text-gray-800 placeholder-gray-300 h-8 px-5 focus:rounded-md focus:outline-gray-500"
            placeholder="ID Pelanggan"
          />
          <input
            type="text"
            name="alamat"
            value={form.alamat}
            onChange={change}
            className="w-full border border-gray-400 rounded-md text-gray-800 placeholder-gray-300 h-8 px-5 focus:rounded-md focus:outline-gray-500"
            placeholder="Alamat Lengkap"
          />
          <select
            name="clasify"
            value={selectedValue}
            onChange={change}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm bg-white border transition duration-150 ease-in-out"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="w-full flex justify-center gap-3">
            <button
              type="submit"
              className="bg-linear-to-br from-navBase to-nav mt-4 w-fit px-4 py-1 text-white font-bold rounded-full shadow-md hover:-translate-y-0.5 active:scale-95 transition"
            >
              Registrasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegAdm;
