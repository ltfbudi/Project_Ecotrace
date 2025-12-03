import { useEffect, useState } from "react";

const CompDash = ({ user }) => {
  const [data, setData] = useState([]);

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
    <div className="p-4">
      {/* DESKTOP TABLE (md and up) */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-sm border">
        <table className="min-w-[640px] w-full bg-white">
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Bulan
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Pemakaian
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Status
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-b">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-center">
            {user.verif === "no" ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-3 text-gray-400 text-sm italic"
                >
                  Akun belum diverifikasi Admin
                </td>
              </tr>
            ) : user.verif === "yes" ? (
              data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2">{item.bulan}</td>
                    <td className="py-2">{item.pemakaian}</td>
                    <td className="py-2">
                      {"Rp " + Number(item.biaya).toLocaleString("id-ID")}
                    </td>
                    <td
                      className={`py-2 ${
                        item.stat === "nunggak"
                          ? "text-red-600"
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
                        ? "Sudah Lunas"
                        : ""}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-3 text-gray-400 text-sm italic"
                  >
                    Tidak ada riwayat data
                  </td>
                </tr>
              )
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
      <br />
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-sm border">
        <table className="min-w-[640px] w-full bg-white">
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Bulan
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Pemakaian
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Biaya
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-center">
            {user.verif === "no" ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-3 text-gray-400 text-sm italic"
                >
                  Akun belum diverifikasi Admin
                </td>
              </tr>
            ) : user.verif === "yes" ? (
              data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2">{item.bulan}</td>
                    <td className="py-2">{item.pemakaian}</td>
                    <td className="py-2">
                      {"Rp " + Number(item.biaya).toLocaleString("id-ID")}
                    </td>
                    <td
                      className={`py-2 ${
                        item.stat === "nunggak"
                          ? "text-red-600"
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
                        ? "Sudah Lunas"
                        : ""}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-3 text-gray-400 text-sm italic"
                  >
                    Tidak ada riwayat data
                  </td>
                </tr>
              )
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
      {/* MOBILE CARD LIST (md and below) */}
      <div className="md:hidden flex flex-col gap-4">
        {user.verif === "no" ? (
          <div className="text-center text-gray-400 italic">
            Akun belum diverifikasi Admin
          </div>
        ) : user.verif === "yes" ? (
          data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow-sm p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <span className="text-gray-500">Bulan</span>
                  <span className="font-semibold">{item.bulan}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Pemakaian</span>
                  <span className="font-semibold">{item.pemakaian}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Biaya</span>
                  <span className="font-semibold">
                    {"Rp " + Number(item.biaya).toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span
                    className={`font-semibold ${
                      item.stat === "nunggak"
                        ? "text-red-600"
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
                      ? "Sudah Lunas"
                      : ""}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 italic">
              Tidak ada riwayat data
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CompDash;
