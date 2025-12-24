import { useEffect, useState } from "react";
import Confirm from "../connection/confirm";
import RegAdm from "../btn-assets/reg-adm";

const UserAdmin = ({ create, setCreate }) => {
  const [userNoVerif, setUserNoVerif] = useState([]);
  const [userVerif, setUserVerif] = useState([]);
  const [noHP, setNoHP] = useState("");
  const [confirm, setConfirm] = useState(false);

  // --- LOGIC API ---
  const decline = async (noHP) => {
    const res = await fetch(`https://api.ecotrace.id/api/decline-acc/${noHP}`, {
      method: "DELETE",
    });
    const temp = await res.json();
    alert(temp.message);
    window.location.reload();
  };

  const deleteAcc = async (id_pel) => {
    const res = await fetch(
      `https://api.ecotrace.id/api/delete-trans-acc/${id_pel}`,
      {
        method: "DELETE",
      }
    );

    const temp = await res.json();
    if (temp.succeed) {
      const res = await fetch(
        `https://api.ecotrace.id/api/delete-acc/${id_pel}`,
        {
          method: "DELETE",
        }
      );

      const temp2 = await res.json();
      alert(temp2.message);
      window.location.reload();
    }
  };

  const historyDelete = async (id_pel) => {
    if (!id_pel) return alert("Gagal membuat tagihan");
    const form = {
      text: `Menghapus Akun dengan ID Pelanggan ${id_pel}`,
      id_pel,
    };
    await fetch(`https://api.ecotrace.id/api/his-acc-conf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  const history = async (noHP) => {
    const form = { text: `Konfirmasi Akun dengan Nomor Telepon ${noHP}` };
    await fetch(`https://api.ecotrace.id/api/his-confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  useEffect(() => {
    const Get = async () => {
      const res = await fetch("https://api.ecotrace.id/api/get-noVerif");
      const temp = await res.json();
      if (temp.succeed) {
        setUserNoVerif(temp.data);
      }
    };
    const Get2 = async () => {
      const res = await fetch("https://api.ecotrace.id/api/get-Verif");
      const temp = await res.json();
      if (temp.succeed) {
        setUserVerif(temp.data);
      }
    };

    Get();
    Get2();
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-3 gap-2">
          <h1 className="text-md md:text-lg font-semibold text-gray-700">
            {title}
          </h1>
        </div>

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
                    // Logic agar tombol tidak terlalu banyak jika halaman ratusan
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
      {confirm && <Confirm noHP={noHP} setConfirm={setConfirm} />}
      {create && <RegAdm setCreate={setCreate} />}

      <div className="flex flex-col gap-6">
        {/* TABEL 1: User Belum Diverifikasi */}
        <TableCard
          title="Informasi User Belum Diverifikasi"
          headers={["Nomor Telepon", "Nama", "Alamat", "Aksi"]}
          data={userNoVerif} // Kirim data mentah
          renderRow={(
            item,
            index // Definisikan cara merender per baris
          ) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                {item.noHP}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                {item.nama}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100 max-w-[200px] truncate">
                {item.alamat}
              </td>
              <td className="px-4 py-3 text-sm border-gray-100 text-center">
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => {
                      setNoHP(item.noHP);
                      setConfirm(true);
                    }}
                    className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-all shadow-sm"
                    title="Verifikasi Akun"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          )}
        />

        {/* TABEL 2: User Sudah Diverifikasi */}
        <TableCard
          title="Informasi User Sudah Diverifikasi"
          headers={[
            "Nomor Telepon",
            "ID Pelanggan",
            "Nama",
            "Alamat",
            "Klasifikasi",
          ]}
          data={userVerif} // Kirim data mentah
          renderRow={(
            item,
            index // Definisikan cara merender per baris
          ) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                {item.noHP}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                {item.id_pel}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                {item.nama}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100 max-w-[200px] truncate">
                {item.alamat}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 font-medium">
                {item.clasify === "KSM" ? (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    Anggota KSM
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Rumah Tangga
                  </span>
                )}
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default UserAdmin;
