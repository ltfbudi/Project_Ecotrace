import { useState } from "react";
import ConfirmPay from "../btn-assets/confirm-pay";

const TagUser = ({ data }) => {
  const [bukti, setBukti] = useState(false);
  const [temp, setTemp] = useState({
    url: "",
    invoice: "",
  });

  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      {bukti && <ConfirmPay setBukti={setBukti} data={temp} />}
      {Array.isArray(data) && data.length > 0
        ? data.map((item, index) => (
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
                  {item.stat !== "nunggak" ? (
                    <button
                      onClick={() => {
                        if (item.stat === "pending") {
                          setBukti(true);
                          setTemp({
                            url: item.url_bukti,
                            invoice: item.invoice,
                          });
                        } else if (item.stat === "lunas") {
                          alert("lunas");
                        } else {
                          alert("Nothing");
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
                  ) : (
                    ""
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
