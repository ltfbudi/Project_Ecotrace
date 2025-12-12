import jsPDF from "jspdf";

const CompStruk = ({ data, setStruk }) => {
  // --- LOGIKA HITUNGAN BIAYA ---
  const biayaAir = Number(data.biaya || 0);
  const biayaAdmin = 10000;
  const totalTagihan = biayaAir + biayaAdmin;

  // --- FUNGSI GENERATE PDF TANPA HTML2CANVAS ---
  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // --- SETUP FONT (Courier agar seperti struk) ---
    doc.setFont("courier", "bold");
    doc.setFontSize(14);

    // --- POSISI AWAL (X, Y) ---
    let y = 20; // Mulai dari atas
    const xLeft = 20; // Margin kiri label
    const xCenter = 105; // Tengah halaman A4
    const xColon = 70; // Posisi titik dua (:)
    const xValue = 75; // Posisi nilai

    // Fungsi bantu untuk membuat baris data
    const printRow = (label, value) => {
      doc.setFont("courier", "normal");
      doc.text(label, xLeft, y);
      doc.text(":", xColon, y);

      // Jika value panjang (seperti alamat), split text
      const splitText = doc.splitTextToSize(String(value), 110);
      doc.text(splitText, xValue, y);

      // Tambah Y sesuai jumlah baris teks (jika alamat panjang)
      y += 6 * splitText.length;
    };

    // --- 1. HEADER ---
    doc.text("KSM BANYU BENING", xCenter, y, { align: "center" });
    y += 7;
    doc.setFontSize(12);
    doc.text("TAGIHAN BULANAN AIR BERSIH", xCenter, y, { align: "center" });
    y += 10;

    // Garis Pemisah Atas
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y);
    y += 8;

    // --- 2. DATA PELANGGAN ---
    doc.setFontSize(11);
    printRow("ID Pelanggan", data.id_pel);
    printRow("Nama", data.nama);
    printRow("Alamat", data.alamat); // Alamat otomatis turun baris jika panjang

    y += 2; // Spacer

    printRow("Tarif/M3", `Rp ${Number(10000).toLocaleString("id-ID")}`);
    printRow("Stand Awal", String(data.pem_awal).padStart(6, "0"));
    printRow("Stand Akhir", String(data.pem_akhir).padStart(6, "0"));

    // Pemakaian Bold
    doc.setFont("courier", "bold");
    printRow("Pemakaian", `${data.pemakaian} M3`);

    doc.setFont("courier", "normal");
    printRow("Periode", `${data.bulan} ${data.tahun}`);

    y += 4;
    // Garis Putus-putus (simulasi manual)
    doc.text(
      "- - - - - - - - - - - - - - - - - - - - - - - - - - -",
      xCenter,
      y,
      { align: "center" }
    );
    y += 8;

    // --- 3. RINCIAN BIAYA ---
    printRow("Tagihan Air", `Rp ${biayaAir.toLocaleString("id-ID")}`);
    printRow("Biaya Admin", `Rp ${biayaAdmin.toLocaleString("id-ID")}`);

    y += 3;
    doc.setFont("courier", "bold");
    doc.setFontSize(14);
    printRow("TOTAL BAYAR", `Rp ${totalTagihan.toLocaleString("id-ID")}`);

    y += 10;
    // Garis Penutup
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y);
    y += 10;

    // --- 4. FOOTER ---
    doc.setFontSize(10);
    doc.setFont("courier", "normal");
    doc.text("Metode Pembayaran: CASH", xCenter, y, { align: "center" });
    y += 6;
    doc.text("Transfer Bank BCA: 4731971719", xCenter, y, { align: "center" });
    y += 5;
    doc.text("a/n Eneng Siti Nurhayati", xCenter, y, { align: "center" });
    y += 8;

    // Teks Jatuh Tempo (Tetap hitam karena request tanpa warna)
    doc.setFont("courier", "bolditalic");
    doc.text("Jatuh tempo pembayaran setiap tanggal 30", xCenter, y, {
      align: "center",
    });
    y += 8;

    doc.setFont("courier", "bold");
    doc.text("* TERIMA KASIH *", xCenter, y, { align: "center" });

    // --- KOTAK PEMBUNGKUS (Opsional, agar mirip struk fisik) ---
    // Menggambar kotak mengelilingi konten
    doc.rect(15, 10, 180, y + 5);

    // Simpan PDF
    doc.save(`Struk-${data.id_pel}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto w-full p-3">
      {/* Container Modal */}
      <div className="bg-white text-black w-[95%] sm:w-[500px] rounded-lg shadow-lg border-2 border-black overflow-hidden relative">
        {/* Header Modal (Tombol Close) */}
        <div className="flex justify-between items-center bg-gray-200 p-2 border-b-2 border-black">
          <span className="font-bold text-sm ml-2 font-mono">
            PREVIEW STRUK
          </span>
          <button
            onClick={() => setStruk(false)}
            className="hover:bg-gray-300 rounded p-1 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-x text-black"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>

        {/* --- TAMPILAN VISUAL DI LAYAR (Hanya Preview) --- */}
        <div className="p-6 font-mono text-sm leading-relaxed">
          <div className="text-center mb-4 border-b-2 border-dashed border-black pb-4">
            <h1 className="font-bold text-lg">KSM BANYU BENING</h1>
            <p>TAGIHAN AIR BERSIH</p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span>ID Pelanggan</span>
              <span>: {data.id_pel}</span>
            </div>
            <div className="flex justify-between">
              <span>Nama</span>
              <span className="text-right">{data.nama}</span>
            </div>
            <div className="flex justify-between">
              <span>Periode</span>
              <span>
                {data.bulan} {data.tahun}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Pemakaian</span>
              <span className="font-bold">{data.pemakaian} M³</span>
            </div>
          </div>

          <div className="my-4 border-t-2 border-dashed border-black pt-2">
            <div className="flex justify-between">
              <span>Tagihan Air</span>
              <span>Rp {biayaAir.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Admin</span>
              <span>Rp {biayaAdmin.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-black">
              <span>TOTAL</span>
              <span>Rp {totalTagihan.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="text-center text-xs mt-6">
            <p>* Terima Kasih *</p>
          </div>
        </div>

        {/* Footer Modal (Tombol Download) */}
        <div className="p-4 bg-gray-100 border-t-2 border-black flex justify-center">
          <button
            onClick={downloadPDF}
            className="bg-black text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-all border border-transparent shadow-lg flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-printer"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
              <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
            </svg>
            CETAK STRUK (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompStruk;
