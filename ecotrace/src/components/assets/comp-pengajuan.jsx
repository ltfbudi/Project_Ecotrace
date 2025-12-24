import { useState, useEffect } from "react";
import CreateTag from "../btn-assets/tag-create";
import PageRev from "../btn-assets/page-rev";

const CompPengajuan = ({ create, user, setCreate }) => {
  const [awal, setAwal] = useState("");
  const [dataRevisi, setDataRevisi] = useState(null);
  const [who, setWho] = useState({
    id: "",
    bulan: "",
    tahun: "",
    id_pel: "",
    pem_awal: "",
    pem_akhir: "",
    pemakaian: "",
    url: "",
    revisi: "",
  });

  const [pageRevisi, setPageRevisi] = useState(false);

  useEffect(() => {
    const Get = async (id_pel) => {
      const res = await fetch(
        `https://api.ecotrace.id/api/pem-awal-id-pel?id_pel=${id_pel}`
      );

      const temp = await res.json();
      if (temp.succeed) {
        setAwal(temp.data[0]);
      }
    };
    const Get2 = async (id_pel) => {
      const res = await fetch(
        `https://api.ecotrace.id/api/get-user-revisi?id_pel=${id_pel}`
      );

      const temp = await res.json();
      if (temp.succeed) {
        setDataRevisi(temp.data);
      }
    };
    Get(user.id_pel);
    Get2(user.id_pel);
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center px-2 sm:px-4">
      {create && <CreateTag setCreate={setCreate} user={user} pemAwal={awal} />}
      {pageRevisi && (
        <PageRev setPageRevisi={setPageRevisi} user={user} who={who} />
      )}
      {user.verif === "no" ? (
        <div className="px-6 py-5 shadow rounded-2xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <div className="flex justify-center items-center w-full h-20 text-center font-Inter text-2xl sm:text-3xl text-gray-400 italic">
            Akun belum diverifikasi Admin
          </div>
        </div>
      ) : Array.isArray(dataRevisi) && dataRevisi.length > 0 ? (
        dataRevisi.map((item, index) => (
          <div
            key={index}
            className="px-6 py-5 shadow-md rounded-2xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2bg-white"
          >
            <h1 className="text-navBase font-bold text-xl">
              {item.bulan + " " + item.tahun}
            </h1>

            <div className="flex flex-col md:flex-row w-full gap-3">
              {/* Kolom 1 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className="md:mt-6 text-gray-600">ID Pelanggan</h3>
                <h3 className="font-bold break-all">{item.id_pel}</h3>

                <h3 className="mt-2 text-gray-600">Nama Pelanggan</h3>
                <h3 className="font-bold">{item.nama}</h3>
              </div>

              {/* Kolom 2 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className=" md:mt-6 text-gray-600">Pemakaian</h3>
                <h3 className="font-bold">{item.pemakaian}</h3>
                <h3 className="mt-2 text-gray-600">Biaya</h3>
                <h3 className="font-bold">{`Rp ${Number(
                  item.biaya
                ).toLocaleString("id-ID")}`}</h3>
              </div>

              {/* Kolom 3 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className=" md:mt-6 text-gray-600">Status Pengajuan</h3>
                <h3
                  className={`font-bold ${
                    item.stat_rev === "yes"
                      ? "text-red-500"
                      : item.stat_rev === "clear"
                      ? "text-green-400"
                      : "text-yellow-300"
                  }`}
                >
                  {item.stat_rev === "yes"
                    ? "Dalam Revisi"
                    : item.stat_rev === "clear"
                    ? "Sudah Approve"
                    : "Dalam Tinjauan"}
                </h3>
                {/* Tombol */}
                {item.stat_rev === "yes" ? (
                  <button
                    onClick={() => {
                      setWho({
                        id: item.id,
                        bulan: item.bulan,
                        tahun: item.tahun,
                        id_pel: item.id_pel,
                        pem_awal: item.pem_awal,
                        pem_akhir: item.pem_akhir,
                        pemakaian: item.pemakaian,
                        url: item.url,
                        revisi: item.revisi,
                      });
                      setPageRevisi(true);
                    }}
                    className="font-bold mt-4 shadow-md w-fit px-6 py-2 rounded-full bg-navBase text-white hover:-translate-y-0.5 transition duration-300 text-sm"
                  >
                    Lihat Revisi
                  </button>
                ) : item.stat_rev === "clear" ? (
                  <button
                    onClick={() => {}}
                    className="font-bold mt-4 shadow-md w-fit px-6 py-2 rounded-full bg-navBase text-white hover:-translate-y-0.5 transition duration-300 text-sm"
                  >
                    Lihat Pengajuan
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="px-6 py-5 shadow rounded-2xl w-full sm:w-3/4">
          <div className="flex justify-center items-center w-full h-20 text-center font-Inter text-2xl sm:text-3xl text-gray-400 italic">
            Tidak ada Pengajuan yang direvisi
          </div>
        </div>
      )}
    </div>
  );
};

export default CompPengajuan;
