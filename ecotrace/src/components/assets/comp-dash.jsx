const CompDash = ({ data }) => {
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

          <tbody className="text-gray-600">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b text-center hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{item.noHP}</td>
                  <td className="px-4 py-2">{item.pemakaian}</td>
                  <td className="px-4 py-2">
                    Rp {Number(item.biaya).toLocaleString("id-ID")}
                  </td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      item.stat === "lunas"
                        ? "text-green-600"
                        : item.stat === "pending"
                        ? "text-yellow-400"
                        : "text-red-600"
                    }`}
                  >
                    {item.stat}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-3 text-gray-400 text-sm italic"
                >
                  Tidak ada data transaksi
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
