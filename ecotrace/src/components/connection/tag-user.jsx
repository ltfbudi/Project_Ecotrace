import { useState } from "react";
import ConfirmPay from "../btn-assets/confirm-pay";
import CompStruk from "../btn-assets/comp-struk";

const TagUser = ({ data }) => {
  const [bukti, setBukti] = useState(false);
  const [temp, setTemp] = useState({
    url: "",
    invoice: "",
    id_pel: "",
  });
  const [struk, setStruk] = useState(false);
  const [strukAcc, setStrukAcc] = useState(null);

  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      {bukti && <ConfirmPay setBukti={setBukti} data={temp} />}
      {struk && <CompStruk data={strukAcc} setStruk={setStruk} />}
      {Array.isArray(data) && data.length > 0
        ? data.map((item, index) => (
            <div
              key={index}
              className="px-6 py-5 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-2xl w-full md:w-4/5 lg:w-3/5"
            >
              <h1 className="text-navBase font-bold text-lg">{item.bulan}</h1>

              <div className="flex flex-col md:flex-row w-full gap-0 lg:gap-6">
                {/* Kolom 1 */}
                <div className="flex flex-col md:w-1/3">
                  <h3 className="mt-2 md:mt-6">Invoice</h3>
                  <h3 className="font-bold">{item.invoice}</h3>

                  <h3 className="mt-2 md:mt-4">Nama Pelanggan</h3>
                  <h3 className="font-bold">{item.nama}</h3>
                </div>

                {/* Kolom 2 */}
                <div className="flex flex-col md:w-1/3">
                  <h3 className="mt-2 md:mt-6">Pemakaian</h3>
                  <h3 className="font-bold">{item.pemakaian + " m³"}</h3>

                  <h3 className="mt-2 md:mt-4">ID Pelanggan</h3>
                  <h3 className="font-bold">{item.id_pel}</h3>
                </div>

                {/* Kolom 3 */}
                <div className="flex flex-col md:w-1/3">
                  <h3 className="mt-2 md:mt-6">Status Pembayaran</h3>
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

                  {item.stat !== "nunggak" && (
                    <button
                      onClick={() => {
                        if (item.stat === "pending") {
                          setBukti(true);
                          setTemp({
                            url: item.url_bukti,
                            invoice: item.invoice,
                            id_pel: item.id_pel,
                          });
                        } else if (item.stat === "lunas") {
                          setStruk(true);
                          setStrukAcc(item);
                        }
                      }}
                      className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 bg-navBase text-white transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
                    >
                      {item.stat === "pending"
                        ? "Lihat Bukti"
                        : item.stat === "lunas"
                        ? "Unduh Struk"
                        : ""}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default TagUser;
