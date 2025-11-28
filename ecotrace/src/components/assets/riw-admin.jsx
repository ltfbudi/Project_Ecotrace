import { useEffect, useState } from "react";

const RiwAdmin = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const Get = async () => {
      const res = await fetch("/api/history-all");

      const temp = await res.json();
      if (!temp.succeed) {
        return console.log(temp.message);
      }
      setData(temp.result);
    };

    Get();
  }, []);
  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-lg shadow-sm border">
        <table className="min-w-[900px] w-full bg-white">
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                ID Pelanggan
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-b">Hal</th>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="text-center text-gray-500 text-md">
                    {item.No_Pel ? `${item.No_Pel}` : "-"}
                  </td>
                  <td className="text-center text-gray-500 text-md">
                    {item.hal}
                  </td>
                  <td className="text-center text-gray-500 text-md">
                    {item.tanggal_format}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Tidak ada Data!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwAdmin;
