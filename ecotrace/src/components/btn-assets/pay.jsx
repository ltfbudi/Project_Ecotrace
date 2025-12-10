import { useRef, useState } from "react";
const Pay = ({ setPay, data }) => {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleChoose = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected)); // preview lokal
  };

  const handleUpload = async () => {
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
      const form = {
        url: temp.url,
        id: data.id,
      };

      const res = await fetch("/api/update-status-tagihan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
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

  const historyBayar = async (id_pel) => {
    if (!id_pel) {
      return alert("Gagal membuat tagihan");
    }
    const form = {
      text: `Menyerahkan Bukti Transaksi untuk ID Pelanggan: ${id_pel}`,
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
    if (temp.succeed) {
      console.log(temp.message);
    } else {
      console.log(temp.message);
    }
  };

  return (
    <div className="fixed inset-0 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] bg-black/50 z-50 flex w-full justify-center items-center overflow-y-auto">
      <div className="w-3/5 bg-white rounded-lg p-5">
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              setPay(false);
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
        <h1 className="text-2xl font-Inter font-bold text-gray-600 text-center  ">
          Pembayaran
        </h1>
        <p>{`ID Pelanggan: ${data.id_pel}`}</p>
        <p>{`Pemakaian: ${data.pemakaian} m³`}</p>
        <p>{`Biaya:  Rp  ` + Number(data.biaya).toLocaleString("id-ID")}</p>
        <p>Pemabayaran dapat dilakukan dengan transfer ke: </p>
        <p>082111164670 DANA a/n Naufal Adli</p>
        <p>059501040133507 BRI a/n Naufal Adli</p>
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
          ref={fileRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="flex w-full justify-center">
          <button
            onClick={handleChoose}
            className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 text-navBase transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
          >
            Pilih Foto
          </button>
        </div>
        <button
          onClick={() => {
            handleUpload();
          }}
          className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 bg-navBase text-white transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
        >
          Upload Foto
        </button>
      </div>
    </div>
  );
};

export default Pay;
