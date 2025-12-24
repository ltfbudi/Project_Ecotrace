import { useState } from "react";
import ConfirmPay from "../btn-assets/confirm-pay";
import CompStruk from "../btn-assets/comp-struk";

const TagUser = ({ data }) => {
  const [bukti, setBukti] = useState(false);
  const [temp, setTemp] = useState({
    id_pel: "",
    nama: "",
    alamat: "",
    pem_awal: "",
    pem_akhir: "",
    pemakaian: "",
    bulan: "",
    tahun: "",
    biaya: "",
  });
  const [struk, setStruk] = useState(false);

  const TableComponent = ({ title, data, type }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const safeData = Array.isArray(data) ? data : [];
    const totalItems = safeData.length;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = safeData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const approve = async (id, id_pel, pem_awal) => {
      const res = await fetch("/api/approve/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const temp = await res.json();
      if (temp.succeed) {
        const res2 = await fetch("/update/pem-awal/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_pel: id_pel,
            pem_awal: pem_awal,
          }),
        });
        const temp2 = await res2.json();
        if (temp2.succeed) {
          window.location.reload();
        } else {
          alert("Gagal 2");
        }
      } else {
        alert("Gagal");
      }
    };

    return (
      <div className="w-full mb-6">
        <h1 className="text-md md:text-lg font-semibold text-gray-700 mb-3">
          {title}
        </h1>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-full">
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  {["ID Pelanggan", "Nama", "Pemakaian", "Biaya", "Aksi"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-100 last:border-r-0"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                        {item.id_pel}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                        {item.nama}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100 max-w-[150px] truncate">
                        {item.pemakaian}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100 whitespace-nowrap">
                        {item.bulan + " " + item.tahun}
                      </td>
                      <td className="px-4 py-3 text-sm border-gray-100 text-center">
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => {
                              if (type === "bukti") {
                              } else if (type === "struk") {
                              } else {
                                setTemp({
                                  id_pel: item.id_pel,
                                  nama: item.nama,
                                  alamat: item.alamat,
                                  pem_awal: item.pem_awal,
                                  pem_akhir: item.pem_akhir,
                                  pemakaian: item.pemakaian,
                                  bulan: item.bulan,
                                  tahun: item.tahun,
                                  biaya: item.biaya,
                                });
                                setStruk(true);
                              }
                            }}
                            className="mr-2 w-8 h-8 rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center text-white transition-all shadow-sm"
                            title="Lihat Detail"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              if (type === "bukti") {
                              } else if (type === "struk") {
                              } else {
                                approve(item.id, item.id_pel, item.pem_akhir);
                              }
                            }}
                            className="ml-2 w-8 h-8 rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center text-white transition-all shadow-sm"
                            title="Approve"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-currency-dollar"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
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
          {totalItems > 0 && (
            <div className="bg-white border-t border-gray-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-medium text-gray-700">
                  {indexOfFirstItem + 1}
                </span>{" "}
                sampai{" "}
                <span className="font-medium text-gray-700">
                  {Math.min(indexOfLastItem, totalItems)}
                </span>{" "}
                dari{" "}
                <span className="font-medium text-gray-700">{totalItems}</span>{" "}
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => {
                    if (
                      totalPages > 7 &&
                      Math.abs(currentPage - number) > 2 &&
                      number !== 1 &&
                      number !== totalPages
                    ) {
                      return null;
                    }
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

  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      {bukti && <ConfirmPay setBukti={setBukti} data={temp} />}
      {struk && <CompStruk data={temp} setStruk={setStruk} />}
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TableComponent
          title="Informasi Pembayar - Pending"
          data={data}
          type="default"
        />
      </div>
    </div>
  );
};

export default TagUser;
