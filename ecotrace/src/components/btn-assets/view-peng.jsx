const ViewPeng = ({ who, setView }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto py-6">
      <div className="max-h-[400px] overflow-y-auto bg-white w-11/12 sm:w-4/5 md:w-3/5 lg:w-2/5 px-6 py-5 rounded-xl shadow-lg text-sm">
        <div className="flex justify-end mb-2">
          <button onClick={() => setView(false)}>
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

        <form className="flex flex-col gap-2 font-Inter">
          <div>
            <label>ID Pelanggan</label>
            <input
              type="text"
              name="id_pel"
              value={who.id_pel}
              disabled
              className="w-full border border-gray-400 rounded-full h-9 px-4"
              placeholder="ID Pelanggan"
            />
          </div>

          <div>
            <label>Periode</label>
            <input
              type="text"
              name="time"
              value={who.bulan + " " + who.tahun}
              disabled
              className="w-full border border-gray-400 rounded-full h-9 px-4"
            />
          </div>
          <div className="flex flex-row w-full">
            <div className="w-3/6 flex flex-col">
              <label>Pemakaian Awal</label>
              <input
                type="text"
                name="pem_awal"
                value={who.pem_awal}
                disabled
                className="w-full border border-gray-400 rounded-full h-9 px-4"
                placeholder="Pemakaian Awal"
              />

              <label className="mt-2">Pemakaian Akhir</label>
              <input
                type="text"
                name="pem_akhir"
                value={who.pem_akhir}
                disabled
                className="w-full border border-gray-400 rounded-full h-9 px-4"
                placeholder="Pemakaian Akhir"
              />
            </div>
            <div className="flex flex-col w-3/6">
              <label>Total Pemakaian</label>
              <input
                type="text"
                disabled
                value={who.pemakaian}
                className="w-full border border-gray-400 rounded-full h-9 px-4"
              />
              <label className="mt-2">Biaya Total</label>
              <input
                type="text"
                disabled
                value={"Rp " + Number(who.biaya).toLocaleString("id-ID")}
                className="w-full border border-gray-400 rounded-full h-9 px-4"
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-50 h-60 flex justify-center items-center align-middle ">
              <img
                src={who.url}
                alt="preview"
                className="w-full h-full align-middle"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewPeng;
