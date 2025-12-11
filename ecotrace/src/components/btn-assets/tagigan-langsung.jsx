import { useState } from "react";

const TagihanLangsung = ({ setCreate, data }) => {
  const [selectedBulan, setSelectedBulan] = useState(null);
  const [selectedTahun, setSelectedTahun] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [awal, setAwal] = useState("");
  const [form, setForm] = useState({
    pem_akhir: "",
  });
  const ids =
    Array.isArray(data) && data.length > 0
      ? data.map((item) => ({
          label: item.id_pel,
          value: item.id_pel,
        }))
      : [{ label: "Tidak ada User", value: "" }];
  const bulans = [
    { label: "Pilih Bulan", value: "" }, // Opsi default / placeholder
    { label: "Januari", value: "Januari" },
    { label: "Februari", value: "Februari" },
    { label: "Maret", value: "Maret" },
    { label: "April", value: "April" },
    { label: "Mei", value: "Mei" },
    { label: "Juni", value: "Juni" },
    { label: "Juli", value: "Juli" },
    { label: "Agustus", value: "Agustus" },
    { label: "September", value: "September" },
    { label: "Oktober", value: "Oktober" },
    { label: "November", value: "November" },
    { label: "Desember", value: "Desember" },
  ];

  const tahuns = [
    { label: "Pilih Tahun", value: "" }, // Opsi default / placeholder
    { label: "2024", value: "2024" },
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
    { label: "2027", value: "2027" },
    { label: "2028", value: "2028" },
    { label: "2029", value: "2029" },
  ];

  const totalPemakaian =
    form.pem_akhir && awal.pemakaian
      ? form.pem_akhir > awal.pemakaian
        ? form.pem_akhir - awal.pemakaian
        : 0
      : 0;
  const harga = totalPemakaian * 10000 + 10000;

  const getPemAwal = async (id_pel) => {
    const res = await fetch(`/api/pem-awal-id-pel?id_pel=${id_pel}`);

    const temp = await res.json();
    if (temp.succeed) {
      setAwal(temp.data[0]);
    }
  };

  const change = (e) => {
    const { name, value } = e.target; // Destructuring untuk kemudahan // Jika input adalah pem_akhir, update state form

    if (name === "id_pel") {
      setSelectedID(value);
      getPemAwal(value);
    } else if (name === "pem_akhir") {
      setForm({
        ...form,
        [name]: value,
      });
    }
    // Jika input adalah bulan, update selectedBulan
    else if (name === "bulan") {
      setSelectedBulan(value);
    }
    // Jika input adalah tahun, update selectedTahun
    else if (name === "tahun") {
      setSelectedTahun(value);
    }
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    const newForm = {
      id_pel: selectedID,
      bulan: selectedBulan,
      tahun: selectedTahun,
      pem_awal: awal.pemakaian,
      pem_akhir: form.pem_akhir,
      pemakaian: totalPemakaian,
      biaya: harga,
    };

    const res = await fetch("/api/buat-tagihan-langsung", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newForm),
    });

    const temp = await res.json();
    if (temp.succeed) {
      const res2 = await fetch("/update/pem-awal/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_pel: selectedID, pem_awal: form.pem_akhir }),
      });
      const temp2 = await res2.json();
      if (temp2.succeed) {
        window.location.reload();
      } else {
        alert("Gagal 2");
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

        <h1 className="text-xl text-navBase font-bold font-Inter mb-3">
          Membuat Transaksi Langsung
        </h1>

        <form
          onSubmit={handleSubmitUser}
          className="flex flex-col gap-2 font-Inter"
        >
          <select
            name="id_pel"
            value={selectedID}
            onChange={change}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm 
                     bg-white border transition duration-150 ease-in-out"
          >
            {ids.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <div>
            <label>Periode</label>
            <div className="flex flex-row">
              <select
                name="bulan"
                value={selectedBulan}
                onChange={change}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm 
                     bg-white border transition duration-150 ease-in-out"
              >
                {bulans.map((bulan) => (
                  <option key={bulan.value} value={bulan.value}>
                    {bulan.label}
                  </option>
                ))}
              </select>
              <select
                name="tahun"
                value={selectedTahun}
                onChange={change}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm 
                     bg-white border transition duration-150 ease-in-out"
              >
                {tahuns.map((tahun) => (
                  <option key={tahun.value} value={tahun.value}>
                    {tahun.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="w-3/6 flex flex-col">
              <label>Pemakaian Awal</label>
              <input
                type="text"
                name="pem_awal"
                value={awal.pemakaian}
                disabled
                onChange={() => {}}
                className="w-full border border-gray-400 rounded-full h-9 px-4"
                placeholder="Pemakaian Awal"
              />

              <label className="mt-2">Pemakaian Akhir</label>
              <input
                type="text"
                name="pem_akhir"
                value={form.pem_akhir}
                onChange={change}
                className="w-full border border-gray-400 rounded-full h-9 px-4"
                placeholder="Pemakaian Akhir"
              />
            </div>
            <div className="flex flex-col w-3/6">
              <label>Total Pemakaian</label>
              <input
                type="text"
                disabled
                value={totalPemakaian}
                onChange={() => {}}
                className="w-full border border-gray-400 rounded-full h-9 px-4"
              />
              <label className="mt-2">Biaya Total</label>
              <input
                type="text"
                disabled
                value={"Rp " + Number(harga).toLocaleString("id-ID")}
                className="w-full border border-gray-400 rounded-full h-9 px-4"
              />
              <h1>
                {totalPemakaian >= 15
                  ? `Biaya Admin : Rp` + Number(10000).toLocaleString("id-ID")
                  : ""}
              </h1>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-linear-to-br from-navBase to-nav mt-4 w-fit px-6 py-1 text-white font-bold rounded-full shadow-md hover:-translate-y-0.5 active:scale-95 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TagihanLangsung;
