import { useState } from "react";

const CreateTag = ({ setCreate }) => {
  const [form, setForm] = useState({
    invoice: "",
    No_Pel: "",
    time: "",
    pem_awal: "",
    pem_akhir: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (err) => {
    err.preventDefault();

    const newForm = {
      ...form,
      pemakaian: form.pem_akhir - form.pem_awal,
      biaya: (form.pem_akhir - form.pem_awal) * 10000,
    };

    try {
      const res = await fetch("/api/add-tagihan-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
      });

      const data = await res.json();
      if (data.succeed) {
        alert(data.message);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto w-full">
      <div className="bg-white w-3/5 px-5 py-4 rounded-xl">
        <div className="flex w-full justify-end">
          <button
            onClick={() => {
              setCreate(false);
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
        <h1 className="text-xl text-navBase font-bold font-Inter mb-1">
          Create Tagihan
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col font-Inter">
          <label htmlFor="invoice">Invoice</label>
          <input
            type="text"
            name="invoice"
            value={form.invoice}
            onChange={change}
            className="w-full border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-9 px-5 focus:rounded-full focus:outline-gray-500 mb-2"
            placeholder="Invoice"
          />
          <label htmlFor="id_pel">ID Pelanggan</label>
          <input
            type="text"
            name="No_Pel"
            value={form.No_Pel}
            onChange={change}
            className="w-full border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-9 px-5 focus:rounded-full focus:outline-gray-500 mb-2"
            placeholder="ID Pelanggan"
          />
          <label htmlFor="time">Waktu</label>
          <input
            type="date"
            name="time"
            value={form.time}
            onChange={change}
            className="w-full border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-9 px-5 focus:rounded-full focus:outline-gray-500 mb-2"
            placeholder="Waktu Pembuatan Tagihan"
          />
          <div className="w-3/5 flex flex-col">
            <label htmlFor="awal">Pemakaian Awal</label>
            <input
              type="text"
              name="pem_awal"
              value={form.pem_awal}
              onChange={change}
              className="w-full border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-9 px-5 focus:rounded-full focus:outline-gray-500 mb-2"
              placeholder="Pemakaian Awal"
            />
            <label htmlFor="akhir">Pemakaian Akhir</label>
            <input
              type="text"
              name="pem_akhir"
              value={form.pem_akhir}
              onChange={change}
              className="w-full border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-9 px-5 focus:rounded-full focus:outline-gray-500 mb-2"
              placeholder="Pemakaian Akhir"
            />
            <div className="flex gap-1 items-center">
              <label htmlFor="bayar" className="w-1/5">
                Biaya Total
              </label>
              <input
                type="text"
                name="biaya"
                value={
                  "RP " +
                  Number(
                    (form.pem_akhir - form.pem_awal) * 10000
                  ).toLocaleString("id-ID")
                }
                className="w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-9 px-5 focus:rounded-full focus:outline-gray-500 mb-2"
                disabled
                placeholder="Rp 0"
              />
            </div>
            <button
              type="submit"
              className="bg-linear-to-br from-nav to-gray-100 w-22 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-full py-1 text-white font-bold text-sm transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTag;
