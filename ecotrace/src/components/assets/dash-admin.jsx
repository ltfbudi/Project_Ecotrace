import { useEffect, useState } from "react";
import Confirm from "../connection/confirm";
const DashAdm = ({ user }) => {
  const [data, setData] = useState([]);
  const [noHP, setNo] = useState("");
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const Get = async (setData) => {
      const res = await fetch("/api/get-user-all");
      const temp = await res.json();
      if (temp.succeed) {
        setData(temp.data);
      }
    };

    Get(setData);
  }, []);

  return (
    <div className="p-4">
      {confirm && <Confirm noHP={noHP} setConfirm={setConfirm} />}

      <div className="overflow-x-auto rounded-lg shadow-sm border">
        <table className="table-fixed min-w-[900px] w-full bg-white">
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold border-b">Nama</th>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Nomor Telepon
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Nomor Pelanggan
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-b">
                Alamat
              </th>
              <th className="px-4 py-3 text-sm font-semibold border-b">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-center">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-gray-400 text-sm italic">
                    {item.nama}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm italic">
                    {item.noHP}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm italic">
                    {item.No_Pel ? item.No_Pel : "-"}
                  </td>
                  <td className="wrap-break-word whitespace-normal px-4 py-3 text-gray-400 text-sm italic">
                    {item.alamat ? item.alamat : "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm italic">
                    {item.verif === "no" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            setConfirm(true);
                            setNo(item.noHP);
                          }}
                          className="border-black"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-check-lg text-green-500"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                          </svg>
                        </button>
                        <button onClick={() => {}} className="border-black">
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
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          alert("Nyala");
                        }}
                        className="border-black"
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
