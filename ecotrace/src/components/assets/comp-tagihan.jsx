const CompTagihan = ({ cond }) => {
  return (
    <div className="w-3/5 px-8 py-5 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-2xl">
      <h1 className="text-navBase font-bold text-lg">Januari</h1>
      <div className="flex w-full">
        <div className="flex flex-col w-1/3">
          <h3 className="mt-6">Invoice</h3>
          <h3 className="font-bold">No.Pelanggan</h3>

          <h3 className="mt-4">Nama Pelanggan</h3>
          <h3 className="font-bold">Nama Pelanggan</h3>
        </div>
        <div className="flex flex-col w-1/3">
          <h3 className="mt-6">Pemakaian</h3>
          <h3 className="font-bold">No.Pelanggan</h3>

          <h3 className="mt-4">No. Pelanggan</h3>
          <h3 className="font-bold">Nomor Pelanggan</h3>
        </div>
        <div className="flex flex-col w-1/3">
          <h3 className="mt-6">Status Pembayaran</h3>
          {cond === "nunggak" ? (
            <h3 className="text-red-600 font-bold">Belum Lunas</h3>
          ) : cond === "pending" ? (
            <h3 className="text-amber-300 font-bold">Pending</h3>
          ) : cond === "lunas" ? (
            <h3 className="text-green-500 font-bold">Lunas</h3>
          ) : (
            <h3 className="text-black font-bold">Gagal Memuat</h3>
          )}
          {cond === "nunggak" ? (
            <button className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 bg-navBase text-white transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300">
              Bayar Tagihan
            </button>
          ) : cond === "lunas" ? (
            <button className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 bg-navBase text-white transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300">
              Unduh Struk
            </button>
          ) : cond === "pending" ? (
            <button className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 bg-navBase text-white transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300">
              Unduh Bukti
            </button>
          ) : (
            <h1></h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompTagihan;
