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
      const res = await fetch("/api/get-user-all");
      const temp = await res.json();
      if (temp.succeed) setData(temp.data);
    };

    Get();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-md md:text-xl text-center font-Inter font-bold">
        Informasi Pengajuan
      </h1>
      <div className="flex flex-row justify-center">
        <div className="border p-6">
          <h2>Pending</h2>
        </div>
        <div className="border p-6">
          <h2>Pending</h2>
        </div>
        <div className="border p-6">
          <h2>Pending</h2>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-col gap-4 items-center md:items-start">
        <div className="w-full md:w-full flex flex-col">
          <h1 className="text-sm md:text-lg">Pending</h1>
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
