import { useEffect, useState } from "react";
// Import komponen Chart.js
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

// Registrasi komponen Chart.js
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

const CompDash = ({ user }) => {
  const [data, setData] = useState([]);
  const [revisi, setRevisi] = useState([]);

  // State untuk Grafik Pemakaian
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // State untuk Grafik Biaya (BARU)
  const [costChartData, setCostChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const Get = async (id_pel) => {
      const res = await fetch(`/api/get-user-bayar-lunas?id_pel=${id_pel}`);
      const temp = await res.json();

      if (temp.succeed) {
        setData(temp.data);

        // --- LOGIKA PERSIAPAN DATA GRAFIK ---
        const latest12 = temp.data.slice(0, 12);
        const reversedData = latest12.reverse();

        const labels = reversedData.map(
          (item) => `${item.bulan} ${item.tahun}`
        );

        // Data Pemakaian
        const valuesPemakaian = reversedData.map((item) =>
          Number(item.pemakaian)
        );

        // Data Biaya (BARU)
        const valuesBiaya = reversedData.map((item) => Number(item.biaya));

        // Setup Grafik Pemakaian (Warna Teal)
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Pemakaian Air (m³)",
              data: valuesPemakaian,
              borderColor: "rgb(20, 184, 166)",
              backgroundColor: "rgba(20, 184, 166, 0.2)",
              tension: 0.4,
              pointBackgroundColor: "white",
              pointBorderColor: "rgb(20, 184, 166)",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
              fill: true,
            },
          ],
        });

        // Setup Grafik Biaya (Warna Biru)
        setCostChartData({
          labels: labels,
          datasets: [
            {
              label: "Total Biaya (Rp)",
              data: valuesBiaya,
              borderColor: "rgb(59, 130, 246)", // Warna Biru
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              tension: 0.4,
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
    };

    const Get2 = async (id_pel) => {
      const res = await fetch(`/api/get-user-revisi?id_pel=${id_pel}`);
      const temp = await res.json();
      if (temp.succeed) {
        setRevisi(temp.data);
      }
    };

    if (user?.id_pel) {
      Get(user.id_pel);
      Get2(user.id_pel);
    }
  }, [user]);

  // --- KONFIGURASI UMUM GRAFIK ---
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { size: 12, family: "'Inter', sans-serif" },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
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
        ticks: { color: "#9ca3af", font: { size: 10 } },
      },
      y: {
        grid: { color: "#f3f4f6", borderDash: [5, 5] },
        ticks: { color: "#9ca3af", font: { size: 10 } },
        beginAtZero: true,
      },
    },
  };

  // Konfigurasi Khusus untuk Grafik Biaya (Format Rupiah di Y-Axis)
  const costOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        ticks: {
          color: "#9ca3af",
          font: { size: 10 },
          callback: function (value) {
            // Format angka menjadi K (Ribu) atau Jt (Juta) agar rapi
            if (value >= 1000000)
              return "Rp " + (value / 1000000).toFixed(1) + "Jt";
            if (value >= 1000) return "Rp " + (value / 1000).toFixed(0) + "K";
            return value;
          },
        },
      },
    },
  };

  // --- KOMPONEN TABEL REUSABLE ---
  const TableCard = ({ title, headers, children, isEmpty }) => {
    return (
      <div className="w-full mb-8">
        <h1 className="text-md md:text-lg font-semibold text-gray-700 mb-3">
          {title}
        </h1>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
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
                {!isEmpty ? (
                  children
                ) : (
                  <tr>
                    <td
                      colSpan={headers.length}
                      className="px-6 py-6 text-center text-gray-400 text-sm"
                    >
                      Tidak ada data tersedia
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // --- RENDER UTAMA ---
  return (
    <div className="w-full p-4 bg-gray-50 min-h-screen">
      {user.verif === "yes" ? (
        <div className="flex flex-col gap-6">
          {/* BAGIAN 1: TABEL-TABEL (Posisi Atas) */}

          {/* TABEL 1: History Pemakaian */}
          <TableCard
            title="History Pemakaian User"
            headers={[
              "Periode",
              "Pemakaian Awal",
              "Pemakaian Akhir",
              "Total Pemakaian",
              "Biaya",
            ]}
            isEmpty={!Array.isArray(data) || data.length === 0}
          >
            {Array.isArray(data) &&
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                    {item.bulan + " " + item.tahun}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                    {item.pem_awal}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                    {item.pem_akhir}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                    {item.pemakaian}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-teal-600">
                    {`Rp ${Number(item.biaya).toLocaleString("id-ID")}`}
                  </td>
                </tr>
              ))}
          </TableCard>

          {/* TABEL 2: Pengajuan Direvisi */}
          <TableCard
            title="Pengajuan Direvisi"
            headers={[
              "Periode",
              "Pemakaian Awal",
              "Pemakaian Akhir",
              "Total Pemakaian",
              "Biaya",
              "Keterangan Revisi",
            ]}
            isEmpty={!Array.isArray(revisi) || revisi.length === 0}
          >
            {Array.isArray(revisi) &&
              revisi.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-red-50 transition-colors bg-white"
                >
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                    {item.bulan + " " + item.tahun}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                    {item.pem_awal}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                    {item.pem_akhir}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                    {item.pemakaian}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                    {`Rp ${Number(item.biaya).toLocaleString("id-ID")}`}
                  </td>
                  <td className="px-4 py-3 text-sm text-red-500 font-medium italic">
                    {item.revisi}
                  </td>
                </tr>
              ))}
          </TableCard>

          {/* BAGIAN 2: GRAFIK (Posisi Bawah - Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Grafik 1: Pemakaian */}
            <div className="w-full">
              <h1 className="text-md md:text-lg font-semibold text-gray-700 mb-3">
                Pemakaian Per Bulan
              </h1>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-72 w-full">
                {chartData.labels.length > 0 ? (
                  <Line data={chartData} options={commonOptions} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Belum ada data grafik
                  </div>
                )}
              </div>
            </div>

            {/* Grafik 2: Total Biaya */}
            <div className="w-full">
              <h1 className="text-md md:text-lg font-semibold text-gray-700 mb-3">
                Total Biaya Per Bulan
              </h1>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-72 w-full">
                {costChartData.labels.length > 0 ? (
                  <Line data={costChartData} options={costOptions} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Belum ada data grafik
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-[50vh]">
          <h1 className="text-center text-2xl md:text-4xl text-gray-300 italic font-bold">
            Akun Belum Diverifikasi
          </h1>
        </div>
      )}
    </div>
  );
};

export default CompDash;
