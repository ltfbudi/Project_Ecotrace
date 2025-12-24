import { useState } from "react";

const Confirm = ({ noHP, setConfirm }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const options = [
    { label: "Pilih Kategori", value: "" }, // Opsi default / placeholder
    { label: "Anggota KSM", value: "KSM" },
    { label: "Rumah Tangga", value: "RT" },
  ];
  const [form, setForm] = useState({
    id_pel: "",
  });

  const change = (e) => {
    if (!setSelectedValue) {
      return alert("Pilih kategori Pengguna!");
    }

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
      noHP: noHP,
      clasify: selectedValue,
    };

    try {
      const res = await fetch("https://api.ecotrace.id/api/confirm-acc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
      });

      const data = await res.json();
      if (data.succeed) {
        const res2 = await fetch(
          "https://api.ecotrace.id/api/tambah-pemakaian-akhir",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_pel: form.id_pel }),
          }
        );

        const temp2 = await res2.json();
        if (temp2.succeed) {
          alert("Berhasil konfirmasi akun pengguna!");
          window.location.reload();
        } else {
          alert(temp2.message);
        }
      } else {
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="px-6 py-4 rounded-xl shadow-lg text-center bg-white">
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              setConfirm(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x text-gray-500"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
        <h1 className="text-lg text-gray-700 font-Inter">
          Memberikan ID Pelanggan
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 mt-5">
          <input
            type="text"
            name="id_pel"
            value={form.id_pel}
            onChange={change}
            placeholder="ID Pelanggan"
            className="w-full border border-gray-400 rounded-md text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-md focus:outline-gray-500"
          />
          <select
            name="kategori"
            value={selectedValue}
            onChange={change}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm 
                     bg-white border transition duration-150 ease-in-out"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-linear-to-br from-nav to-gray-100 w-32 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-full py-2 text-white font-bold text-md transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Confirm;
