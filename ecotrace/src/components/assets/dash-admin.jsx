import { useEffect, useState } from "react";
import Confirm from "../connection/confirm";

const DashAdm = ({ user }) => {
  const [data, setData] = useState([]);
  const [noHP, setNo] = useState("");
  const [confirm, setConfirm] = useState(false);

  const decline = async (noHP) => {
    const res = await fetch(`/api/decline-acc/${noHP}`, { method: "DELETE" });
    const temp = await res.json();
    alert(temp.message);
    window.location.reload();
  };

  const deleteAcc = async (No_Pel) => {
    const res = await fetch(`/api/delete-trans-acc/${No_Pel}`, {
      method: "DELETE",
    });

    const temp = await res.json();
    if (temp.succeed) {
      const res = await fetch(`/api/delete-acc/${No_Pel}`, {
        method: "DELETE",
      });

      const temp2 = await res.json();
      alert(temp2.message);
      window.location.reload();
    }
  };

  const historyDelete = async (No_Pel) => {
    if (!No_Pel) return alert("Gagal membuat tagihan");
    const form = {
      text: `Menghapus Akun dengan ID Pelanggan ${No_Pel}`,
      No_Pel,
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
      const res = await fetch("/api/get-user-all");
      const temp = await res.json();
      if (temp.succeed) setData(temp.data);
    };

    Get();
  }, []);

  return (
    <div className="p-3 sm:p-4">
      {confirm && <Confirm noHP={noHP} setConfirm={setConfirm} />}

      {/* WRAPPER RESPONSIVE */}
      <div className="w-full overflow-x-auto shadow-sm rounded-xl overflow-hidden border">
        {/* TABEL */}
        <table className="w-full border-collapse md:min-w-[600px] lg:min-w-[900px] sm:min-w-full">
          <thead className="bg-gray-100 text-gray-700 text-center text-xs sm:text-sm">
            <tr>
              <th className="sm:px-2 py-2 font-semibold border-b">Nama</th>
              <th className="sm:px-2 py-2 font-semibold border-b">
                No. Telepon
              </th>
              <th className="sm:px-2 py-2 font-semibold border-b">Alamat</th>
              <th className="sm:px-2 py-2 font-semibold border-b">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-center text-xs sm:text-sm">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="xs:px-1 sm:px-2 py-2 border-b">{item.nama}</td>
                  <td className="xs:px-1 sm:px-2 py-2 border">{item.noHP}</td>

                  {/* ALAMAT */}
                  <td className="xs:px-1 sm:px-2 py-2 max-w-[150px] truncate sm:whitespace-normal border">
                    {item.alamat || "-"}
                  </td>

                  {/* AKSI */}
                  <td className="sm:px-2 py-2 border-b">
                    <div className="flex justify-center gap-2 sm:gap-3">
                      {item.verif === "no" ? (
                        <>
                          {/* CHECK */}
                          <button
                            onClick={() => {
                              setConfirm(true);
                              setNo(item.noHP);
                              history(item.noHP);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-check2 text-green-500"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                            </svg>
                          </button>

                          {/* TRASH */}
                          <button onClick={() => decline(item.noHP)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash3 text-red-500"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            historyDelete(item.No_Pel);
                            deleteAcc(item.No_Pel);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash3 text-red-500"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-3 text-gray-400 text-sm italic"
                >
                  Tidak ada User
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashAdm;
