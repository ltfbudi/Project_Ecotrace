import { useEffect, useState } from "react";

const CompDash = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const Get = async (setData, noHP) => {
      const res = await fetch(`/api/data-transaksi?noHP=${noHP}`);
      const temp = res.json();

      if (temp.succeed) {
        setData(temp.data);
      }
    };
    Get(setData, user.noHP);
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
            ) : Array.isArray(data) && data.length > 0 ? (
              ""
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-3 text-gray-400 text-sm italic"
                >
                  Tidak ada riwayat data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompDash;
