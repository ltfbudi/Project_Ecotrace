import { useEffect, useState } from "react";
import Confirm from "../connection/confirm";
import CreateTag from "../btn-assets/tag-create";

const DashAdm = ({ user }) => {
  const [dataPending, setDataPending] = useState(null);
  const [noHP, setNo] = useState("");
  const [create, setCreate] = useState(false);
  const [who, setWho] = useState({
    id: "",
    url: "",
  });
  const [jmlPending, setJmlPending] = useState(0);
  const [jmlApprove, setJmlApprove] = useState(0);
  const [jmlBlmBayar, setJmlBlmBayar] = useState(0);
  const [jmlSdhBayar, setJmlSdhBayar] = useState(0);

  const decline = async (noHP) => {
    const res = await fetch(`/api/decline-acc/${noHP}`, { method: "DELETE" });
    const temp = await res.json();
    alert(temp.message);
    window.location.reload();
  };

  const deleteAcc = async (id_pel) => {
    const res = await fetch(`/api/delete-trans-acc/${id_pel}`, {
      method: "DELETE",
    });

    const temp = await res.json();
    if (temp.succeed) {
      const res = await fetch(`/api/delete-acc/${id_pel}`, {
        method: "DELETE",
      });

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
    await fetch(`/api/his-acc-conf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  const history = async (noHP) => {
    const form = { text: `Konfirmasi Akun dengan Nomor Telepon ${noHP}` };
    await fetch(`/api/his-confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  useEffect(() => {
    const Get = async () => {
      const res = await fetch("/api/get-count-pending");

      const temp = await res.json();

      if (temp.succeed) {
        setJmlPending(temp.data[0].jml);
      } else {
        console.log(temp.message);
      }
    };
    const Get2 = async () => {
      const res = await fetch("/api/get-count-approve");

      const temp = await res.json();

      if (temp.succeed) {
        setJmlApprove(temp.data[0].jml);
      } else {
        console.log(temp.message);
      }
    };
    const Get3 = async () => {
      const res = await fetch("/api/get-count-sudah-bayar");

      const temp = await res.json();

      if (temp.succeed) {
        setJmlSdhBayar(temp.data[0].jml);
      } else {
        console.log(temp.message);
      }
    };
    const Get4 = async () => {
      const res = await fetch("/api/get-count-belum-bayar");

      const temp = await res.json();

      if (temp.succeed) {
        setJmlBlmBayar(temp.data[0].jml);
      } else {
        console.log(temp.message);
      }
    };
    const GetDataPending = async () => {
      const res = await fetch("/api/get-all-pending");

      const temp = await res.json();
      if (temp.succeed) {
        setDataPending(temp.data);
        console.log(temp.data);
      }
    };

    Get();
    Get2();
    Get3();
    Get4();
    GetDataPending();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Row Pertama */}
        <div className="w-full sm:w-3/6 flex flex-col md:flex-row gap-2">
          <div className="flex flex-col w-full md:w-3/6">
            <div className="bg-white rounded-lg p-4 p-lg-4-2 mb-4 shadow-[0_3px_8px_rgb(0,0,0,0.3)]">
              <div className="flex items-center justify-start">
                <div className="me-4 bg-red-500 p-4 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-x-circle-fill text-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                  </svg>
                </div>
                <div>
                  <p className="text-muted mb-1">Transaksi Belum Bayar</p>
                  <h5 className="mb-0">{jmlBlmBayar}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-3/6">
            <div className="bg-white rounded-lg p-4 p-lg-4-2 mb-4 shadow-[0_3px_8px_rgb(0,0,0,0.3)]">
              <div className="flex items-center justify-start">
                <div className="me-4 bg-green-500 p-4 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-wallet-fill text-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542s.987-.254 1.194-.542C9.42 6.644 9.5 6.253 9.5 6a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2z" />
                    <path d="M16 6.5h-5.551a2.7 2.7 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5s-1.613-.412-2.006-.958A2.7 2.7 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-muted mb-1">Transaksi Sudah Bayar</p>
                  <h5 className="fw-bold mb-0">{jmlSdhBayar}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/6 flex flex-col md:flex-row gap-2">
          <div className="flex flex-col w-full md:w-3/6">
            <div className="bg-white rounded-lg p-4 p-lg-4-2 mb-4 shadow-[0_3px_8px_rgb(0,0,0,0.3)]">
              <div className="flex items-center justify-start">
                <div className="me-4 bg-amber-300 p-4 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-alarm-fill text-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5m2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.04 8.04 0 0 0 .86 5.387M11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.04 8.04 0 0 0-3.527-3.527" />
                  </svg>
                </div>
                <div>
                  <p className="text-muted mb-1">Pengajuan Pending</p>
                  <h5 className="mb-0">{jmlPending}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full  md:w-3/6">
            <div className="bg-white rounded-lg p-4 p-lg-4-2 mb-4 shadow-[0_3px_8px_rgb(0,0,0,0.3)]">
              <div className="flex items-center justify-start">
                <div className="me-4 bg-blue-500 p-4 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-hand-thumbs-up-fill text-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                  </svg>
                </div>
                <div>
                  <p className="mb-1">Pengajuan Approve</p>
                  <h5 className="mb-0">{jmlApprove}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-col gap-4 items-center md:items-start">
        <div className="w-full md:w-full flex flex-col">
          <h1 className="text-sm md:text-lg">Informasi Pengajuan - Pending</h1>
          <table className="w-full border-collapse mb-5">
            <thead className="bg-gray-100 text-gray-700 text-center text-xs sm:text-sm">
              <tr>
                <th className="sm:px-2 py-2 font-semibold border-b">
                  ID Pelanggan
                </th>
                <th className="sm:px-2 py-2 font-semibold border-b">Nama</th>
                <th className="sm:px-2 py-2 font-semibold border-b">Email</th>
                <th className="sm:px-2 py-2 font-semibold border-b">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-center text-xs sm:text-sm">
              {Array.isArray(dataPending) && dataPending.length > 0
                ? dataPending.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="xs:px-1 sm:px-2 py-2 border-b">
                        {item.id_pel}
                      </td>
                      <td className="xs:px-1 sm:px-2 py-2 border">
                        {item.nama}
                      </td>
                      <td className="xs:px-1 sm:px-2 py-2 max-w-[150px] truncate sm:whitespace-normal border">
                        {item.email}
                      </td>
                      <td className="sm:px-2 border-b">
                        <div className="bg-navBase w-fit p-1 rounded-sm">
                          <svg
                            onClick={() => {}}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-eye-fill text-white"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
          <h1 className="text-md md:text-lg">Informasi Pengajuan- Disetujui</h1>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-center text-xs sm:text-sm">
              <tr>
                <th className="sm:px-2 py-2 font-semibold border-b">
                  ID Pelanggan
                </th>
                <th className="sm:px-2 py-2 font-semibold border-b">Nama</th>
                <th className="sm:px-2 py-2 font-semibold border-b">Email</th>
                <th className="sm:px-2 py-2 font-semibold border-b">Aksi</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-center text-xs sm:text-sm">
              <tr className="hover:bg-gray-50">
                <td className="xs:px-1 sm:px-2 py-2 border-b">asdasd</td>
                <td className="xs:px-1 sm:px-2 py-2 border">asdsa</td>
                <td className="xs:px-1 sm:px-2 py-2 max-w-[150px] truncate sm:whitespace-normal border">
                  aoisjdasjdo
                </td>
                <td className="sm:px-2 py-2 border-b">psakdpsaokd</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full md:w-full">
          <h1 className="text-md md:text-lg">
            Informasi Pengajuan- Dalam Revisi
          </h1>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-center text-xs sm:text-sm">
              <tr>
                <th className="sm:px-2 py-2 font-semibold border-b">
                  ID Pelanggan
                </th>
                <th className="sm:px-2 py-2 font-semibold border-b">Nama</th>
                <th className="sm:px-2 py-2 font-semibold border-b">Email</th>
                <th className="sm:px-2 py-2 font-semibold border-b">Aksi</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-center text-xs sm:text-sm">
              <tr className="hover:bg-gray-50">
                <td className="xs:px-1 sm:px-2 py-2 border-b">asdasd</td>
                <td className="xs:px-1 sm:px-2 py-2 border">asdsa</td>
                <td className="xs:px-1 sm:px-2 py-2 max-w-[150px] truncate sm:whitespace-normal border">
                  aoisjdasjdo
                </td>
                <td className="sm:px-2 py-2 border-b">psakdpsaokd</td>
              </tr>
            </tbody>
          </table>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DashAdm;
