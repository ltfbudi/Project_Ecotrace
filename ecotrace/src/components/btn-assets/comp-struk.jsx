import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CompStruk = ({ data, setStruk }) => {
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(pdfRef.current, {
      scale: 3,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Struk-${data.id_pel}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto w-full p-3">
      <div
        className="
      w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%]
      rounded-xl py-4 px-4 bg-white text-black
    "
      >
        <div className="w-full">
          <div className="flex w-full justify-end">
            <button onClick={() => setStruk(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-x text-gray-500"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </div>

          <div className="px-2 sm:px-4" ref={pdfRef}>
            <h1 className="font-bold text-center text-xl sm:text-2xl mb-3">
              KSM Banyu Bening Tagihan Bulanan Air Bersih
            </h1>

            <table className="mt-3 w-full text-sm sm:text-base">
              <tbody>
                <tr>
                  <td className="w-1/3">ID Pelanggan</td>
                  <td>:</td>
                  <td>{data.id_pel}</td>
                </tr>
                <tr>
                  <td>Nama Lengkap</td>
                  <td>:</td>
                  <td>{data.nama}</td>
                </tr>
                <tr>
                  <td>Alamat</td>
                  <td>:</td>
                  <td>{data.alamat}</td>
                </tr>
                <tr>
                  <td>Tarif/M³</td>
                  <td>:</td>
                  <td>{`Rp ${Number(10000).toLocaleString("id-ID")}`}</td>
                </tr>
                <tr>
                  <td>Stand Meter Awal</td>
                  <td>:</td>
                  <td>{data.pem_awal}</td>
                </tr>
                <tr>
                  <td>Stand Meter Akhir</td>
                  <td>:</td>
                  <td>{data.pem_akhir}</td>
                </tr>
                <tr>
                  <td>Pemakaian (M³)</td>
                  <td>:</td>
                  <td>{data.pemakaian}</td>
                </tr>
                <tr>
                  <td>Periode</td>
                  <td>:</td>
                  <td>{data.bulan}</td>
                </tr>
                <tr>
                  <td>Tagihan Air</td>
                  <td>:</td>
                  <td>{`Rp ${Number(data.biaya).toLocaleString("id-ID")}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full flex justify-center mt-4 mb-3">
          <button
            onClick={downloadPDF}
            className="font-bold shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] px-6 rounded-full py-2 bg-navBase text-white"
          >
            Unduh Struk
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompStruk;
