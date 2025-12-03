import { useEffect, useState } from "react";
import Pay from "../btn-assets/pay";
import CompStruk from "../btn-assets/comp-struk";
import Bukti from "../btn-assets/bukti-pend";

const CompTagihan = ({ user }) => {
  const [data, setData] = useState([]);
  const [pay, setPay] = useState(false);
  const [who, setWho] = useState({
    invo: "",
    pemakaian: "",
    biaya: "",
  });

  const [temp, setTemp] = useState({
    url: "",
    invoice: "",
    id_pel: "",
  });

  const [strukAcc, setAcc] = useState(null);
  const [struk, setStruk] = useState(false);
  const [bukti, setBukti] = useState(false);
  const [url, setURL] = useState("");

  useEffect(() => {
    const Get = async (id_pel) => {
      const res = await fetch(`/api/data-transaksi?id_pel=${id_pel}`);
      const temp = await res.json();

      if (temp.succeed) {
        setData(temp.data);
      }
    };
    Get(user.id_pel);
  }, []);
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center px-2 sm:px-4">
      {bukti && <Bukti setBukti={setBukti} data={temp} />}
      {struk && <CompStruk data={strukAcc} setStruk={setStruk} />}
      {pay && <Pay who={who} setPay={setPay} setURL={setURL} />}

      {/* jika belum verif */}
      {user.verif === "no" ? (
        <div className="px-6 py-5 shadow rounded-2xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <div className="flex justify-center items-center w-full h-20 text-center font-Inter text-2xl sm:text-3xl text-gray-400 italic">
            Akun belum diverifikasi Admin
          </div>
        </div>
      ) : Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="px-6 py-5 shadow-md rounded-2xl 
                     w-full sm:w-3/4 md:w-2/3 lg:w-1/2
                     bg-white"
          >
            {/* Header bulan */}
            <h1 className="text-navBase font-bold text-xl">{item.bulan}</h1>

            {/* 3 kolom → responsif */}
            <div className="flex flex-col md:flex-row w-full gap-3">
              {/* Kolom 1 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className="md:mt-6 text-gray-600">Invoice</h3>
                <h3 className="font-bold break-all">{item.invoice}</h3>

                <h3 className="mt-2 text-gray-600">Nama Pelanggan</h3>
                <h3 className="font-bold">{item.nama}</h3>
              </div>

              {/* Kolom 2 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className=" md:mt-6 text-gray-600">Pemakaian</h3>
                <h3 className="font-bold">{item.pemakaian + " m³"}</h3>

                <h3 className="mt-2 text-gray-600">ID Pelanggan</h3>
                <h3 className="font-bold">{item.id_pel}</h3>
              </div>

              {/* Kolom 3 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className="md:mt-6 text-gray-600">Status Pembayaran</h3>
                <h3
                  className={`font-bold ${
                    item.stat === "nunggak"
                      ? "text-red-500"
                      : item.stat === "pending"
                      ? "text-yellow-500"
                      : item.stat === "lunas"
                      ? "text-green-600"
                      : ""
                  }`}
                >
                  {item.stat === "nunggak"
                    ? "Belum Dibayar"
                    : item.stat === "pending"
                    ? "Pending"
                    : item.stat === "lunas"
                    ? "Lunas"
                    : ""}
                </h3>

                {/* Tombol */}
                <button
                  onClick={() => {
                    if (item.stat === "nunggak") {
                      setPay(true);
                      setWho({
                        invo: item.invoice,
                        pemakaian: item.pemakaian,
                        biaya: item.biaya,
                        id_pel: item.id_pel,
                      });
                    } else if (item.stat === "pending") {
                      setBukti(true);
                      setTemp({
                        url: item.url_bukti,
                        invoice: item.invoice,
                        id_pel: item.id_pel,
                      });
                    } else if (item.stat === "lunas") {
                      setStruk(true);
                      setAcc(item);
                    }
                  }}
                  className="font-bold mt-4 shadow-md w-fit px-6 py-2 
                           rounded-full bg-navBase text-white 
                           hover:-translate-y-0.5 transition duration-300 text-sm"
                >
                  {item.stat === "nunggak"
                    ? "Bayar Tagihan"
                    : item.stat === "pending"
                    ? "Lihat Bukti"
                    : item.stat === "lunas"
                    ? "Unduh Struk"
                    : ""}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center w-full h-20 text-center font-Inter text-2xl sm:text-3xl text-gray-400 italic">
          Tidak ada data transaksi
        </div>
      )}
    </div>
  );
};

export default CompTagihan;
