import { useState, useEffect } from "react";

const RiwUser = ({ user }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const Get = async (No_Pel) => {
      const res = await fetch(`/api/history-by-NoPel/?No_Pel=${No_Pel}`);

      const temp = await res.json();
      if (!temp.succeed) {
        return console.log(temp.message);
      }
      setData(temp.result);
    };

    Get(user.No_Pel);
  }, []);
  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-lg shadow-sm border">
        <table className="min-w-[300px] lg:min-w-[700px] lg:max-w-[900px] w-full bg-white">
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr>
              <th className="py-3 md:px-3 text-xs md:text-sm font-semibold border-b border-r">
                ID Pelanggan
              </th>
              <th className="py-3 md:px-3 text-xs md:text-sm font-semibold border-b">
                Hal
              </th>
              <th className="py-3 md:px-3 text-xs md:text-sm font-semibold border-b border-l">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-all border-b last:border-none"
                >
                  <td className="md:px-3 py-3 text-center text-gray-600 border-r text-xs md:text-base">
                    {item.No_Pel || "-"}
                  </td>

                  <td className="md:px-3 py-3 text-center text-gray-600 border-r text-xs md:text-base">
                    {item.hal}
                  </td>

                  <td className="md:px-3 py-3 text-center text-gray-600 border-l text-xs md:text-base">
                    {item.tanggal_format}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-gray-400">
                <td colSpan="3">Tidak ada Data!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwUser;
