import { useEffect, useState } from "react";
import Confirm from "../connection/confirm";
import RegAdm from "../btn-assets/reg-adm";

const UserAdmin = ({ create, setCreate }) => {
  const [userNoVerif, setUserNoVerif] = useState([]);
  const [userVerif, setUserVerif] = useState([]);
  const [noHP, setNoHP] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [data, setData] = useState({});

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
      const res = await fetch("/api/get-noVerif");

      const temp = await res.json();
      if (temp.succeed) {
        setUserNoVerif(temp.data);
      } else {
        alert("Gagal Terkoneksi");
      }
    };
    const Get2 = async () => {
      const res = await fetch("/api/get-Verif");

      const temp = await res.json();
      if (temp.succeed) {
        setUserVerif(temp.data);
      } else {
        alert("Gagal Terkoneksi");
      }
    };

    Get();
    Get2();
  }, []);
  return (
    <div className="w-full flex flex-col md:flex-col gap-4 items-center md:items-start">
      {confirm && <Confirm noHP={noHP} setConfirm={setConfirm} />}
      {create && <RegAdm setCreate={setCreate} />}
      <div className="w-full md:w-full flex flex-col">
        <h1 className="text-sm md:text-lg">
          Informasi User Belum Diverifikasi
        </h1>
        <table className="w-full border-collapse mb-5">
          <thead className="bg-gray-100 text-gray-700 text-center text-xs sm:text-sm">
            <tr>
              <th className="sm:px-2 py-2 font-semibold border-b">
                Nomor Telepon
              </th>
              <th className="sm:px-2 py-2 font-semibold border-b">Nama</th>
              <th className="sm:px-2 py-2 font-semibold border-b">Email</th>
              <th className="sm:px-2 py-2 font-semibold border-b">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-center text-xs sm:text-sm">
            {Array.isArray(userNoVerif) && userNoVerif.length > 0
              ? userNoVerif.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="xs:px-1 sm:px-2 py-2 border-b">
                      {item.noHP}
                    </td>
                    <td className="xs:px-1 sm:px-2 py-2 border">{item.nama}</td>
                    <td className="xs:px-1 sm:px-2 py-2 max-w-[150px] truncate sm:whitespace-normal border">
                      {item.email}
                    </td>
                    <td className="sm:px-2 border-b">
                      <div
                        onClick={() => {
                          setNoHP(item.noHP);
                          setConfirm(true);
                        }}
                        className="bg-green-500 w-fit p-1 rounded-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-lg text-white text-center"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
      <div className="w-full md:w-full flex flex-col">
        <h1 className="text-sm md:text-lg">
          Informasi User Sudah Diverifikasi
        </h1>
        <table className="w-full border-collapse mb-5">
          <thead className="bg-gray-100 text-gray-700 text-center text-xs sm:text-sm">
            <tr>
              <th className="sm:px-2 py-2 font-semibold border-b">
                Nomor Telepon
              </th>
              <th className="sm:px-2 py-2 font-semibold border-b">
                ID Pelanggan
              </th>
              <th className="sm:px-2 py-2 font-semibold border-b">Nama</th>
              <th className="sm:px-2 py-2 font-semibold border-b">Email</th>
              <th className="sm:px-2 py-2 font-semibold border-b">
                Klasifikasi
              </th>
              <th className="sm:px-2 py-2 font-semibold border-b">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-center text-xs sm:text-sm">
            {Array.isArray(userVerif) && userVerif.length > 0
              ? userVerif.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="xs:px-1 sm:px-2 py-2 border-b">
                      {item.noHP}
                    </td>
                    <td className="xs:px-1 sm:px-2 py-2 border">
                      {item.id_pel}
                    </td>
                    <td className="xs:px-1 sm:px-2 py-2 border">{item.nama}</td>
                    <td className="xs:px-1 sm:px-2 py-2 max-w-[150px] truncate sm:whitespace-normal border">
                      {item.email}
                    </td>
                    <td className="xs:px-1 sm:px-2 py-2 max-w-[150px] truncate sm:whitespace-normal border">
                      {item.clasify === "KSM" ? "Anggota KSM" : "Rumah Tangga"}
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
      </div>
    </div>
  );
};

export default UserAdmin;
