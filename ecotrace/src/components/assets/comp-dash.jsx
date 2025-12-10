import { useEffect, useState } from "react";

const CompDash = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const Get = async (id_pel) => {
      const res = await fetch(`/api/get-user-bayar-lunas?id_pel=${id_pel}`);

      const temp = await res.json();
      if (temp.succeed) {
        setData(temp.data);
      }
    };
    Get(user.id_pel);
  }, []);

  return (
    <div className="w-full">
      {user.verif === "yes" ? (
        <div className="w-full">
          <div className="w-full flex flex-col md:flex-col gap-4 items-center md:items-start">
            <div className="w-full md:w-full flex flex-col">
              <h1 className="text-sm md:text-lg">History Pemakaian User</h1>
              <table className="w-full border-collapse mb-5">
                <thead className="bg-gray-100 text-gray-700 text-center text-xs sm:text-sm">
                  <tr>
                    <th className="sm:px-2 py-2 font-semibold border-b">
                      Periode
                    </th>
                    <th className="sm:px-2 py-2 font-semibold border-b">
                      Pemakaian Awal
                    </th>
                    <th className="sm:px-2 py-2 font-semibold border-b">
                      Pemakaian Akhir
                    </th>
                    <th className="sm:px-2 py-2 font-semibold border-b">
                      Total Pemakaian
                    </th>
                    <th className="sm:px-2 py-2 font-semibold border-b">
                      Biaya
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-700 text-center text-xs sm:text-sm">
                  {Array.isArray(data) && data.length > 0
                    ? data.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="xs:px-1 sm:px-2 py-2 border-b">
                            {item.bulan + " " + item.tahun}
                          </td>
                          <td className="xs:px-1 sm:px-2 py-2 border">
                            {item.pem_awal}
                          </td>
                          <td className="xs:px-1 sm:px-2 py-2 max-w-[150px] truncate sm:whitespace-normal border">
                            {item.pem_akhir}
                          </td>
                          <td className="xs:px-1 sm:px-2 py-2 max-w-[150px] truncate sm:whitespace-normal border">
                            {item.pemakaian}
                          </td>
                          <td className="sm:px-2 border-b">{`Rp ${Number(
                            item.biaya
                          ).toLocaleString("id-ID")}`}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-center text-4xl text-gray-400 italic">
            Akun Belum Diverifikasi
          </h1>
        </div>
      )}
    </div>
  );
};

export default CompDash;
