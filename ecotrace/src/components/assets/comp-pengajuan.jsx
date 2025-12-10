import { useState, useEffect } from "react";
import CreateTag from "../btn-assets/tag-create";

const CompPengajuan = ({ create, user, setCreate }) => {
  const [awal, setAwal] = useState("");
  const [dataRevisi, setDataRevisi] = useState(null);

  useEffect(() => {
    const Get = async (id_pel) => {
      const res = await fetch(`/api/pem-awal-id-pel?id_pel=${id_pel}`);

      const temp = await res.json();
      if (temp.succeed) {
        setAwal(temp.data[0]);
      }
    };
    const Get2 = async (id_pel) => {
      const res = await fetch(`/api/get-user-revisi?id_pel=${id_pel}`);

      const temp = await res.json();
      if (temp.succeed) {
        setDataRevisi(temp.data);
      }
    };
    Get(user.id_pel);
    Get2(user.id_pel);
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center px-2 sm:px-4">
      {create && <CreateTag setCreate={setCreate} user={user} pemAwal={awal} />}
      {user.verif === "no" ? (
        <div className="px-6 py-5 shadow rounded-2xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <div className="flex justify-center items-center w-full h-20 text-center font-Inter text-2xl sm:text-3xl text-gray-400 italic">
            Akun belum diverifikasi Admin
          </div>
        </div>
      ) : Array.isArray(dataRevisi) && dataRevisi.length > 0 ? (
        dataRevisi.map((item, index) => (
          <div
            key={index}
            className="px-6 py-5 shadow-md rounded-2xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2bg-white"
          >
            {/* Header bulan */}
            <h1 className="text-navBase font-bold text-xl">Bulan</h1>

            {/* 3 kolom → responsif */}
            <div className="flex flex-col md:flex-row w-full gap-3">
              {/* Kolom 1 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className="md:mt-6 text-gray-600">Invoice</h3>
                <h3 className="font-bold break-all">Invoice</h3>

                <h3 className="mt-2 text-gray-600">Nama Pelanggan</h3>
                <h3 className="font-bold">nama</h3>
              </div>

              {/* Kolom 2 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className=" md:mt-6 text-gray-600">Pemakaian</h3>
                <h3 className="font-bold">asdasdsd</h3>

                <h3 className="mt-2 text-gray-600">ID Pelanggan</h3>
                <h3 className="font-bold">sadsad</h3>
              </div>

              {/* Kolom 3 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className="md:mt-6 text-gray-600">Status Pembayaran</h3>
                <h3 className={`font-bold `}>asdadsa</h3>

                {/* Tombol */}
                <button
                  onClick={() => {
                    alert("Haloo");
                  }}
                  className="font-bold mt-4 shadow-md w-fit px-6 py-2 rounded-full bg-navBase text-white hover:-translate-y-0.5 transition duration-300 text-sm"
                >
                  asdadasasd
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="px-6 py-5 shadow rounded-2xl w-full sm:w-3/4">
          <div className="flex justify-center items-center w-full h-20 text-center font-Inter text-2xl sm:text-3xl text-gray-400 italic">
            Tidak ada Pengajuan yang direvisi
          </div>
        </div>
      )}
    </div>
  );
};

export default CompPengajuan;
