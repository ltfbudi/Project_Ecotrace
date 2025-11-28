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
    No_Pel: "",
  });

  const [strukAcc, setAcc] = useState(null);
  const [struk, setStruk] = useState(false);
  const [bukti, setBukti] = useState(false);
  const [url, setURL] = useState("");

  useEffect(() => {
    const Get = async (No_Pel) => {
      const res = await fetch(`/api/data-transaksi?No_Pel=${No_Pel}`);
      const temp = await res.json();

      if (temp.succeed) {
        setData(temp.data);
      }
    };
    Get(user.No_Pel);
  }, []);
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      {bukti && <Bukti setBukti={setBukti} data={temp} />}
      {struk && <CompStruk data={strukAcc} setStruk={setStruk} />}
      {pay && <Pay who={who} setPay={setPay} setURL={setURL} />}
      {user.verif === "no" ? (
        <div className="px-8 py-5 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-2xl w-3/5">
          <div className="flex justify-center items-center w-full h-20 text-center font-Inter text-3xl text-gray-400 italic">
            Akun belum diverifikasi Admin
          </div>
        </div>
      ) : Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="px-8 py-5 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-2xl w-3/5"
          >
            <h1 className="text-navBase font-bold text-lg">{item.bulan}</h1>
            <div className="flex w-full">
              <div className="flex flex-col w-1/3">
                <h3 className="mt-6">Invoice</h3>
                <h3 className="font-bold">{item.invoice}</h3>

                <h3 className="mt-4">Nama Pelanggan</h3>
                <h3 className="font-bold">{item.nama}</h3>
              </div>
              <div className="flex flex-col w-1/3">
                <h3 className="mt-6">Pemakaian</h3>
                <h3 className="font-bold">{item.pemakaian + " m³"}</h3>

                <h3 className="mt-4">ID Pelanggan</h3>
                <h3 className="font-bold">{item.No_Pel}</h3>
              </div>
              <div className="flex flex-col w-1/3">
                <h3 className="mt-6">Status Pembayaran</h3>
                <h3
                  className={`font-bold ${
                    item.stat === "nunggak"
                      ? "text-red-500"
                      : item.stat === "pending"
                      ? "text-yellow-400"
                      : item.stat === "lunas"
                      ? "text-green-500"
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
                <button
                  onClick={() => {
                    if (item.stat === "nunggak") {
                      setPay(true);
                      setWho({
                        invo: item.invoice,
                        pemakaian: item.pemakaian,
                        biaya: item.biaya,
                        No_Pel: item.No_Pel,
                      });
                    } else if (item.stat === "pending") {
                      setBukti(true);
                      setTemp({
                        url: item.url_bukti,
                        invoice: item.invoice,
                        No_Pel: item.No_Pel,
                      });
                    } else if (item.stat === "lunas") {
                      setStruk(true);
                      setAcc(item);
                    } else {
                      alert("Nothing");
                    }
                  }}
                  className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 bg-navBase text-white transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
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
        <div className="flex justify-center items-center w-full h-20 text-center font-Inter text-3xl text-gray-400 italic">
          Tidak ada data transaksi
        </div>
      )}
    </div>
  );
};

export default CompTagihan;
