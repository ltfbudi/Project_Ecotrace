import { useEffect, useState } from "react";

const RiwAdmin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const Get = async () => {
      const res = await fetch("/api/history-all");
      const temp = await res.json();

      if (!temp.succeed) {
        console.log(temp.message);
        return;
      }

      setData(temp.result);
    };

    Get();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="min-w-[300px] lg:min-w-[700px] lg:max-w-[900px] w-full bg-white">
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr>
              <th className="py-3 md:px-3 text-xs md:text-sm font-semibold border-b">
                ID Pelanggan
              </th>
              <th className="py-3 md:px-3 text-xs md:text-sm font-semibold border-b">
                Hal
              </th>
              <th className="py-3 md:px-3 text-xs md:text-sm font-semibold border-b">
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
                    {item.id_pel || "-"}
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
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  Tidak ada Data!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwAdmin;
