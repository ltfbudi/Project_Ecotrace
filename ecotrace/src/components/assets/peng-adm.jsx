import { useEffect, useState } from "react";

const PengAdm = ({ user }) => {
  const [dataPending, setDataPending] = useState(null);
  const [dataApprove, setDataApprove] = useState(null);

  useEffect(() => {
    const GetDataPengajuanPending = async () => {
      const res = await fetch("/api/get-all-pending");
      const temp = await res.json();
      if (temp.succeed) {
        setDataPending(temp.data);
      }
    };

    const GetDataApprove = async () => {
      const res = await fetch("/api/get-all-approve");
      const temp = await res.json();
      if (temp.succeed) {
        setDataApprove(temp.data);
      }
    };

    GetDataPengajuanPending();
    GetDataApprove();
  }, []);

  // --- KOMPONEN TABEL CANGGIH (Pagination + Filter Limit) ---
  const TableCard = ({ title, headers, data, renderRow }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default 10 data

    // Pastikan data selalu array
    const safeData = Array.isArray(data) ? data : [];

    // Reset ke halaman 1 jika filter berubah
    useEffect(() => {
      setCurrentPage(1);
    }, [itemsPerPage, safeData]);

    // Logic Hitung Data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = safeData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(safeData.length / itemsPerPage);

    // Navigasi
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const nextPage = () =>
      currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
      <div className="w-full mb-8">
        <h1 className="text-md md:text-lg font-semibold text-gray-700 mb-3">
          {title}
        </h1>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          {/* Header Kontrol (Filter Jumlah Data) */}
          <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Tampilkan</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>data</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-full">
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-100 last:border-r-0"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => renderRow(item, index))
                ) : (
                  <tr>
                    <td
                      colSpan={headers.length}
                      className="px-6 py-8 text-center text-gray-400 text-sm"
                    >
                      Tidak ada data tersedia
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          {safeData.length > 0 && (
            <div className="bg-white border-t border-gray-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-medium text-gray-700">
                  {indexOfFirstItem + 1}
                </span>{" "}
                sampai{" "}
                <span className="font-medium text-gray-700">
                  {Math.min(indexOfLastItem, safeData.length)}
                </span>{" "}
                dari{" "}
                <span className="font-medium text-gray-700">
                  {safeData.length}
                </span>{" "}
                data
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-teal-600"
                  }`}
                >
                  &lt;
                </button>

                {/* Tombol Angka Halaman */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => {
                    if (
                      totalPages > 5 &&
                      Math.abs(currentPage - number) > 1 &&
                      number !== 1 &&
                      number !== totalPages
                    )
                      return null;

                    return (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                          currentPage === number
                            ? "bg-teal-500 text-white border border-teal-500 shadow-md"
                            : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {number}
                      </button>
                    );
                  }
                )}

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                    currentPage === totalPages
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-teal-600"
                  }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- RENDER UTAMA ---
  return (
    <div className="w-full p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-6">
        {/* TABEL 1: Pengajuan Pending */}
        <TableCard
          title="Informasi Pengajuan - Pending"
          headers={["ID Pelanggan", "Nama", "Email", "Periode"]}
          data={dataPending} // Kirim data mentah ke TableCard
          renderRow={(item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                {item.id_pel}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                {item.nama}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100 max-w-[200px] truncate">
                {item.email}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100 whitespace-nowrap">
                {item.tanggal_format}
              </td>
            </tr>
          )}
        />

        {/* TABEL 2: Pengajuan Disetujui */}
        <TableCard
          title="Informasi Pengajuan - Disetujui"
          headers={["ID Pelanggan", "Nama", "Email", "Periode"]}
          data={dataApprove} // Kirim data mentah ke TableCard
          renderRow={(item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                {item.id_pel}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                {item.nama}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100 max-w-[200px] truncate">
                {item.email}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100 whitespace-nowrap">
                {item.tanggal_format}
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default PengAdm;
