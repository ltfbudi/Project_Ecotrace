import { useEffect, useState } from "react";
// 1. Import komponen Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import TagUser from "../connection/tag-user";
import CreateTagAdm from "../btn-assets/tag-create-adm";
import Bukti from "../btn-assets/bukti-pend";
import CompStruk from "../btn-assets/comp-struk";

// 2. Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashAdm = ({ user }) => {
  // State Data Mentah dari API
  const [chart, setChart] = useState([]); // Ubah inisial ke array kosong agar lebih aman
  const [dataPending, setDataPending] = useState(null);
  const [dataApprove, setDataApprove] = useState(null);
  const [dataBlmBayar, setDataBlmBayar] = useState(null);
  const [dataBaruBayar, setDataBaruBayar] = useState(null);
  const [dataSdhBayar, setDataSdhBayar] = useState(null);
  const [struk, setStruk] = useState(false);
  const [data, setData] = useState({
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

  // State UI
  const [create, setCreate] = useState(false);
  const [bukti, setBukti] = useState(false);
  const [who, setWho] = useState({});
  const [url, setUrl] = useState({
    url: "",
    id: "",
    id_pel: "",
    pem_awal: "",
  });

  // State Statistik
  const [jmlPending, setJmlPending] = useState(0);
  const [jmlApprove, setJmlApprove] = useState(0);
  const [jmlBlmBayar, setJmlBlmBayar] = useState(0);
  const [jmlSdhBayar, setJmlSdhBayar] = useState(0);

  // State untuk Data Visualisasi Grafik
  const [chartDisplayData, setChartDisplayData] = useState({
    labels: [],
    datasets: [],
  });

  // --- API CALLS ---
  const getPemAkhir = async (id) => {
    const res = await fetch(`/api/pengajuan-user-by-id?id=${id}`);
    const temp = await res.json();
    if (temp.succeed) {
      setWho(temp.data[0]);
    }
  };

  useEffect(() => {
    const fetchCount = async (url, setter) => {
      const res = await fetch(url);
      const temp = await res.json();
      if (temp.succeed) setter(temp.data[0].jml);
    };

    const fetchData = async (url, setter) => {
      const res = await fetch(url);
      const temp = await res.json();
      if (temp.succeed) setter(temp.data);
    };

    fetchCount("/api/get-count-pending", setJmlPending);
    fetchCount("/api/get-count-approve", setJmlApprove);
    fetchCount("/api/get-count-sudah-bayar", setJmlSdhBayar);
    fetchCount("/api/get-count-belum-bayar", setJmlBlmBayar);

    fetchData("/api/get-all-pending", setDataPending);
    fetchData("/api/get-all-approve", setDataApprove);
    fetchData("/api/get-all-bayar-pending", setDataBlmBayar);
    fetchData("/api/get-all-bayar-lunas", setDataSdhBayar);
    fetchData("/api/get-all-baru-bayar", setDataBaruBayar);

    // Ambil data untuk Chart
    fetchData("/api/chart", setChart);
  }, []);

  // --- USE EFFECT KHUSUS UNTUK OLAH DATA CHART ---
  useEffect(() => {
    // Pastikan data chart ada dan berbentuk array
    if (Array.isArray(chart) && chart.length > 0) {
      // 1. Ambil 12 bulan terakhir (Data API biasanya urut terbaru ke terlama)
      const latestData = chart.slice(0, 12);

      // 2. Balik urutan agar tampil dari Kiri (Lama) ke Kanan (Baru)
      const reversedData = latestData.reverse();

      // 3. Mapping Label (Bulan/Tahun) dan Data (Total Pemakaian)
      const labels = reversedData.map((item) => `${item.bulan}/${item.tahun}`);
      const values = reversedData.map((item) => Number(item.total_pemakaian));

      setChartDisplayData({
        labels: labels,
        datasets: [
          {
            label: "Total Pemakaian Air (m³)",
            data: values,
            borderColor: "rgb(59, 130, 246)", // Warna Biru Admin
            backgroundColor: "rgba(59, 130, 246, 0.15)", // Area transparan
            tension: 0.4, // Garis melengkung
            pointBackgroundColor: "white",
            pointBorderColor: "rgb(59, 130, 246)",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
          },
        ],
      });
    }
  }, [chart]);

  // --- OPSI CHART ---
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af", font: { size: 11 } },
      },
      y: {
        grid: { color: "#f3f4f6", borderDash: [5, 5] },
        ticks: { color: "#9ca3af", font: { size: 11 } },
        beginAtZero: true,
      },
    },
  };

  // --- KOMPONEN TABEL DENGAN PAGINATION ---
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
                  {["ID Pelanggan", "Nama", "Alamat", "Periode", "Aksi"].map(
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
                        {item.alamat}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100 whitespace-nowrap">
                        {item.bulan + " " + item.tahun}
                      </td>
                      <td className="px-4 py-3 text-sm border-gray-100 text-center">
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => {
                              if (type === "bukti") {
                                setUrl({
                                  url: item.url_bukti,
                                  id: item.id,
                                  id_pel: item.id_pel,
                                  pem_awal: item.pem_akhir,
                                });
                                setBukti(true);
                              } else if (type === "struk") {
                                setData({
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
                              } else {
                                getPemAkhir(item.id);
                                setCreate(true);
                              }
                            }}
                            className="w-8 h-8 rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center text-white transition-all shadow-sm"
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
    <div className="w-full bg-gray-50 min-h-screen p-4">
      {create && <CreateTagAdm setCreate={setCreate} user={user} who={who} />}
      {bukti && <Bukti setBukti={setBukti} data={url} />}
      {struk && <CompStruk data={data} setStruk={setStruk} />}

      {/* --- BAGIAN 1: GRAFIK TOTAL PEMAKAIAN (BARU) --- */}
      <div className="w-full mb-8">
        <h1 className="text-md md:text-lg font-semibold text-gray-700 mb-3">
          Grafik Akumulasi Pemakaian Air
        </h1>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-80 w-full">
          {chartDisplayData.labels.length > 0 ? (
            <Line data={chartDisplayData} options={chartOptions} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              Memuat data grafik...
            </div>
          )}
        </div>
      </div>

      {/* --- BAGIAN 2: STATISTIK CARDS --- */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="w-full sm:w-1/2 flex flex-col gap-4">
          <StatsCard
            color="red"
            title="Transaksi Belum Bayar"
            count={jmlBlmBayar}
            icon="x"
          />
          <StatsCard
            color="green"
            title="Transaksi Sudah Bayar"
            count={jmlSdhBayar}
            icon="wallet"
          />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col gap-4">
          <StatsCard
            color="yellow"
            title="Pengajuan Pending"
            count={jmlPending}
            icon="alarm"
          />
          <StatsCard
            color="blue"
            title="Pengajuan Approve"
            count={jmlApprove}
            icon="thumb"
          />
        </div>
      </div>

      {/* --- BAGIAN 3: TABEL DATA --- */}
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TableComponent
            title="Informasi Pengajuan - Pending"
            data={dataPending}
            type="default"
          />
          <TableComponent
            title="Informasi Pengajuan - Disetujui"
            data={dataApprove}
            type="default"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TableComponent
            title="Informasi Pembayar - Pending"
            data={dataBlmBayar}
            type="default"
          />
          <TableComponent
            title="Informasi Pembayar - Approval (Bukti)"
            data={dataBaruBayar}
            type="bukti"
          />
        </div>

        <div className="w-full">
          <TableComponent
            title="Informasi Pembayar - Lunas"
            data={dataSdhBayar}
            type="struk"
          />
        </div>
      </div>
    </div>
  );
};

// Komponen StatsCard
const StatsCard = ({ color, title, count, icon }) => {
  const bgColors = {
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-amber-300",
    blue: "bg-blue-500",
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
      <div className="flex items-center justify-start">
        <div
          className={`me-4 ${bgColors[color]} p-4 rounded-full shadow-sm flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 16 16"
          >
            {icon === "x" && (
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            )}
            {icon === "wallet" && (
              <>
                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542s.987-.254 1.194-.542C9.42 6.644 9.5 6.253 9.5 6a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2z" />
                <path d="M16 6.5h-5.551a2.7 2.7 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5s-1.613-.412-2.006-.958A2.7 2.7 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5z" />
              </>
            )}
            {icon === "alarm" && (
              <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5m2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.04 8.04 0 0 0 .86 5.387M11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.04 8.04 0 0 0-3.527-3.527" />
            )}
            {icon === "thumb" && (
              <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
            )}
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h5 className="text-xl font-bold text-gray-800 mb-0">{count}</h5>
        </div>
      </div>
    </div>
  );
};

export default DashAdm;
