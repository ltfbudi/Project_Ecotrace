import { useEffect, useState } from "react";

const CompDash = ({ user }) => {
  const [data, setData] = useState([]);

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
    <div className="p-4">
      <div className="overflow-x-auto rounded-lg shadow-sm border">
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
                          ? "text-yellow-300"
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
    </div>
  );
};

export default CompDash;
