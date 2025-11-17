import { useEffect, useState } from "react";

const CompTagihan = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const Get = async (noHP, setData) => {
      const res = await fetch(`/api/data-transaksi?noHP=${noHP}`);
      const temp = res.json();
      if (temp.succeed) {
        setData(temp.data);
      }
    };
  });
  return (
    <div className="px-8 py-5 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-2xl w-3/5">
      {user.verif === "no" ? (
        <div>
          <h1 className="text-navBase font-bold text-lg">Januari</h1>
          <div className="flex w-full">
            <div className="flex flex-col w-1/3">
              <h3 className="mt-6">Invoice</h3>
              <h3 className="font-bold">No.Pelanggan</h3>

              <h3 className="mt-4">Nama Pelanggan</h3>
              <h3 className="font-bold">user.nama</h3>
            </div>
            <div className="flex flex-col w-1/3">
              <h3 className="mt-6">Pemakaian</h3>
              <h3 className="font-bold">asdsad</h3>

              <h3 className="mt-4">No. Pelanggan</h3>
              <h3 className="font-bold">Nomor Pelanggan</h3>
            </div>
            <div className="flex flex-col w-1/3">
              <h3 className="mt-6">Status Pembayaran</h3>
              <h3 className="text-red-500">Belum Bayar</h3>
              <button
                onClick={() => {
                  "";
                }}
                className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 bg-navBase text-white transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
              >
                Bayar Tagihan
              </button>
            </div>
          </div>
        </div>
      ) : // <div className="flex justify-center items-center w-full h-20 text-center font-Inter text-3xl text-gray-400 italic">
      //   Akun belum diverifikasi Admin
      // </div>
      Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <div>
            <h1 className="text-navBase font-bold text-lg">Januari</h1>
            <div className="flex w-full">
              <div className="flex flex-col w-1/3">
                <h3 className="mt-6">Invoice</h3>
                <h3 className="font-bold">No.Pelanggan</h3>

                <h3 className="mt-4">Nama Pelanggan</h3>
                <h3 className="font-bold">user.nama</h3>
              </div>
              <div className="flex flex-col w-1/3">
                <h3 className="mt-6">Pemakaian</h3>
                <h3 className="font-bold">asdsad</h3>

                <h3 className="mt-4">No. Pelanggan</h3>
                <h3 className="font-bold">Nomor Pelanggan</h3>
              </div>
              <div className="flex flex-col w-1/3">
                <h3 className="mt-6">Status Pembayaran</h3>
                <h3 className="text-red-500">Belum Bayar</h3>
                <button
                  onClick={() => {
                    "";
                  }}
                  className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 bg-navBase text-white transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
                >
                  Bayar Tagihan
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center w-full h-20 text-center font-Inter text-3xl text-gray-400 italic">
          Tidak ada data transaksi
        </div>
      )}
    </div>
  );
};

export default CompTagihan;
