import { useState, useRef, useEffect } from "react";

const CreateTag = ({ setCreate, user }) => {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [awal, setAwal] = useState({});
  const [form, setForm] = useState({
    time: "",
    pem_akhir: "",
  });
  const totalPemakaian = form.pem_akhir - awal.pemakaian;
  const harga = (form.pem_akhir - awal.pemakaian) * 10000;

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

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih foto dulu!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ecotrace_default");

    const res = await fetch("/api/upload-bayar", {
      method: "POST",
      body: formData,
    });
    const temp = await res.json();

    if (temp.succeed) {
      const newForm = {
        ...form,
        url: temp.url,
        pem_awal: awal.pemakaian,
        total: totalPemakaian,
        biaya: harga,
        id_pel: user.id_pel,
      };

      const res = await fetch("/api/upload-pengajuan-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
      });

      const temp2 = await res.json();
      if (temp2.succeed) {
        alert(temp2.message);
        window.location.reload();
      } else {
        alert(temp2.message);
      }
    } else {
      alert(temp.message);
    }
  };

  const history = async (id_pel, bulan) => {
    if (!id_pel || !bulan) return alert("Gagal membuat tagihan");

    const form = {
      text: `Membuat tagihan pada ${bulan}`,
      id_pel: id_pel,
    };

    const res = await fetch(`/api/his-acc-conf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const temp = await res.json();
    console.log(temp.message);
  };

  const handleChoose = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected)); // preview lokal
  };

  useEffect(() => {
    const Get = async (id_pel) => {
      const res = await fetch(`/api/pem-awal-id-pel?id_pel=${id_pel}`);

      const temp = await res.json();
      if (temp.succeed) {
        setAwal(temp.data[0]);
      }
    };
    Get(user.id_pel);
  }, [user.id_pel]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto py-6">
      {user.role === "user" ? (
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
            Membuat Pengajuan Transaksi
          </h1>

          <form
            onSubmit={handleSubmitUser}
            className="flex flex-col gap-2 font-Inter"
          >
            <div>
              <label>ID Pelanggan</label>
              <input
                type="text"
                name="id_pel"
                value={user.id_pel}
                disabled
                onChange={() => {}}
                className="w-full border border-gray-400 rounded-full h-9 px-4"
                placeholder="ID Pelanggan"
              />
            </div>

            <div>
              <label>Waktu</label>
              <input
                type="date"
                name="time"
                value={form.time}
                onChange={change}
                className="w-full border border-gray-400 rounded-full h-9 px-4"
              />
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
                  value={"RP " + Number(harga).toLocaleString("id-ID")}
                  className="w-full border border-gray-400 rounded-full h-9 px-4"
                />
              </div>
            </div>
            {preview ? (
              <div className="w-full flex justify-center">
                <div className="w-50 h-60 flex justify-center items-center align-middle ">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full align-middle"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <div className="w-50 h-60 flex justify-center items-center align-middle ">
                  <img
                    src={`https://tse1.mm.bing.net/th/id/OIP.ksezYmQQItwKOBx_9d2Q-AHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3`}
                    alt="preview"
                    className="w-full h-full align-middle"
                  />
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div className="flex w-full justify-center">
              <h1
                onClick={handleChoose}
                className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 text-navBase transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
              >
                Pilih Foto
              </h1>
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={() => {}}
                type="submit"
                className="bg-linear-to-br from-navBase to-nav mt-4 w-fit px-6 py-1 text-white font-bold rounded-full shadow-md hover:-translate-y-0.5 active:scale-95 transition"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      ) : user.role === "admin" ? (
        <div className="bg-white w-11/12 sm:w-4/5 md:w-3/5 lg:w-2/5 px-6 py-5 rounded-xl shadow-lg">
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
            Create Tagihan
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 font-Inter"
          >
            <div>
              <label>ID Pelanggan</label>
              <input
                type="text"
                name="id_pel"
                value={form.id_pel}
                onChange={change}
                className="w-full border border-gray-400 rounded-full h-9 px-4"
                placeholder="ID Pelanggan"
              />
            </div>

            <div>
              <label>Waktu</label>
              <input
                type="date"
                name="time"
                value={form.time}
                onChange={change}
                className="w-full border border-gray-400 rounded-full h-9 px-4"
              />
            </div>

            <div className="w-full flex flex-col sm:w-4/5">
              <label>Pemakaian Awal</label>
              <input
                type="text"
                name="pem_awal"
                value={form.pem_awal}
                onChange={change}
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

              <div className="flex items-center gap-2 mt-3">
                <label className="w-1/3 sm:w-1/5">Biaya Total</label>
                <input
                  type="text"
                  disabled
                  value={
                    "RP " +
                    Number(
                      (form.pem_akhir - form.pem_awal) * 10000
                    ).toLocaleString("id-ID")
                  }
                  className="w-2/3 sm:w-4/5 border border-gray-400 rounded-full h-9 px-4"
                />
              </div>

              <button
                onClick={() => history(form.id_pel, form.time)}
                type="submit"
                className="bg-linear-to-br from-navBase to-nav mt-4 w-fit px-6 py-1 text-white font-bold rounded-full shadow-md hover:-translate-y-0.5 active:scale-95 transition"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateTag;
