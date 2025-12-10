// {/* <div className="p-3 sm:p-4">
//       {confirm && <Confirm noHP={noHP} setConfirm={setConfirm} />}

//       {/* WRAPPER RESPONSIVE */}
//       <div className="w-full overflow-x-auto shadow-sm rounded-xl overflow-hidden border">
//         {/* TABEL */}
//         <table className="w-full border-collapse md:min-w-[600px] lg:min-w-[900px] sm:min-w-full">
//           <thead className="bg-gray-100 text-gray-700 text-center text-xs sm:text-sm">
//             <tr>
//               <th className="sm:px-2 py-2 font-semibold border-b">Nama</th>
//               <th className="sm:px-2 py-2 font-semibold border-b">
//                 No. Telepon
//               </th>
//               <th className="sm:px-2 py-2 font-semibold border-b">Alamat</th>
//               <th className="sm:px-2 py-2 font-semibold border-b">Aksi</th>
//             </tr>
//           </thead>

//           <tbody className="text-gray-700 text-center text-xs sm:text-sm">
//             {Array.isArray(data) && data.length > 0 ? (
//               data.map((item, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="xs:px-1 sm:px-2 py-2 border-b">{item.nama}</td>
//                   <td className="xs:px-1 sm:px-2 py-2 border">{item.noHP}</td>

//                   {/* ALAMAT */}
//                   <td className="xs:px-1 sm:px-2 py-2 max-w-[150px] truncate sm:whitespace-normal border">
//                     {item.alamat || "-"}
//                   </td>

//                   {/* AKSI */}
//                   <td className="sm:px-2 py-2 border-b">
//                     <div className="flex justify-center gap-2 sm:gap-3">
//                       {item.verif === "no" ? (
//                         <>
//                           {/* CHECK */}
//                           <button
//                             onClick={() => {
//                               setConfirm(true);
//                               setNo(item.noHP);
//                               history(item.noHP);
//                             }}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               fill="currentColor"
//                               className="bi bi-check2 text-green-500"
//                               viewBox="0 0 16 16"
//                             >
//                               <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
//                             </svg>
//                           </button>

//                           {/* TRASH */}
//                           <button onClick={() => decline(item.noHP)}>
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               fill="currentColor"
//                               className="bi bi-trash3 text-red-500"
//                               viewBox="0 0 16 16"
//                             >
//                               <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
//                             </svg>
//                           </button>
//                         </>
//                       ) : (
//                         <button
//                           onClick={() => {
//                             historyDelete(item.id_pel);
//                             deleteAcc(item.id_pel);
//                           }}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             fill="currentColor"
//                             className="bi bi-trash3 text-red-500"
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
//                           </svg>
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="px-4 py-3 text-gray-400 text-sm italic"
//                 >
//                   Tidak ada User
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div> */}

// DASH USER DISINI!!!!
// {/* <div className="p-4">
//       {/* DESKTOP TABLE (md and up) */}
//       <div className="hidden md:block overflow-x-auto rounded-lg shadow-sm border">
//         <table className="min-w-[640px] w-full bg-white">
//           <thead className="bg-gray-100 text-gray-700 text-center">
//             <tr>
//               <th className="px-4 py-3 text-sm font-semibold border-b">
//                 Bulan
//               </th>
//               <th className="px-4 py-3 text-sm font-semibold border-b">
//                 Pemakaian
//               </th>
//               <th className="px-4 py-3 text-sm font-semibold border-b">
//                 Status
//               </th>
//               <th className="px-4 py-3 text-sm font-semibold border-b">Aksi</th>
//             </tr>
//           </thead>

//           <tbody className="text-gray-600 text-center">
//             {user.verif === "no" ? (
//               <tr>
//                 <td
//                   colSpan="4"
//                   className="px-4 py-3 text-gray-400 text-sm italic"
//                 >
//                   Akun belum diverifikasi Admin
//                 </td>
//               </tr>
//             ) : user.verif === "yes" ? (
//               data.length > 0 ? (
//                 data.map((item, index) => (
//                   <tr key={index}>
//                     <td className="py-2">{item.bulan}</td>
//                     <td className="py-2">{item.pemakaian}</td>
//                     <td className="py-2">
//                       {"Rp " + Number(item.biaya).toLocaleString("id-ID")}
//                     </td>
//                     <td
//                       className={`py-2 ${
//                         item.stat === "nunggak"
//                           ? "text-red-600"
//                           : item.stat === "pending"
//                           ? "text-yellow-400"
//                           : item.stat === "lunas"
//                           ? "text-green-500"
//                           : ""
//                       }`}
//                     >
//                       {item.stat === "nunggak"
//                         ? "Belum Dibayar"
//                         : item.stat === "pending"
//                         ? "Pending"
//                         : item.stat === "lunas"
//                         ? "Sudah Lunas"
//                         : ""}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="px-4 py-3 text-gray-400 text-sm italic"
//                   >
//                     Tidak ada riwayat data
//                   </td>
//                 </tr>
//               )
//             ) : (
//               ""
//             )}
//           </tbody>
//         </table>
//       </div>
//       <br />
//       <div className="hidden md:block overflow-x-auto rounded-lg shadow-sm border">
//         <table className="min-w-[640px] w-full bg-white">
//           <thead className="bg-gray-100 text-gray-700 text-center">
//             <tr>
//               <th className="px-4 py-3 text-sm font-semibold border-b">
//                 Bulan
//               </th>
//               <th className="px-4 py-3 text-sm font-semibold border-b">
//                 Pemakaian
//               </th>
//               <th className="px-4 py-3 text-sm font-semibold border-b">
//                 Biaya
//               </th>
//               <th className="px-4 py-3 text-sm font-semibold border-b">
//                 Status
//               </th>
//             </tr>
//           </thead>

//           <tbody className="text-gray-600 text-center">
//             {user.verif === "no" ? (
//               <tr>
//                 <td
//                   colSpan="4"
//                   className="px-4 py-3 text-gray-400 text-sm italic"
//                 >
//                   Akun belum diverifikasi Admin
//                 </td>
//               </tr>
//             ) : user.verif === "yes" ? (
//               data.length > 0 ? (
//                 data.map((item, index) => (
//                   <tr key={index}>
//                     <td className="py-2">{item.bulan}</td>
//                     <td className="py-2">{item.pemakaian}</td>
//                     <td className="py-2">
//                       {"Rp " + Number(item.biaya).toLocaleString("id-ID")}
//                     </td>
//                     <td
//                       className={`py-2 ${
//                         item.stat === "nunggak"
//                           ? "text-red-600"
//                           : item.stat === "pending"
//                           ? "text-yellow-400"
//                           : item.stat === "lunas"
//                           ? "text-green-500"
//                           : ""
//                       }`}
//                     >
//                       {item.stat === "nunggak"
//                         ? "Belum Dibayar"
//                         : item.stat === "pending"
//                         ? "Pending"
//                         : item.stat === "lunas"
//                         ? "Sudah Lunas"
//                         : ""}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="px-4 py-3 text-gray-400 text-sm italic"
//                   >
//                     Tidak ada riwayat data
//                   </td>
//                 </tr>
//               )
//             ) : (
//               ""
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* MOBILE CARD LIST (md and below) */}
//       <div className="md:hidden flex flex-col gap-4">
//         {user.verif === "no" ? (
//           <div className="text-center text-gray-400 italic">
//             Akun belum diverifikasi Admin
//           </div>
//         ) : user.verif === "yes" ? (
//           data.length > 0 ? (
//             data.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white border rounded-lg shadow-sm p-4 flex flex-col gap-2"
//               >
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Bulan</span>
//                   <span className="font-semibold">{item.bulan}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Pemakaian</span>
//                   <span className="font-semibold">{item.pemakaian}</span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Biaya</span>
//                   <span className="font-semibold">
//                     {"Rp " + Number(item.biaya).toLocaleString("id-ID")}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Status</span>
//                   <span
//                     className={`font-semibold ${
//                       item.stat === "nunggak"
//                         ? "text-red-600"
//                         : item.stat === "pending"
//                         ? "text-yellow-400"
//                         : item.stat === "lunas"
//                         ? "text-green-500"
//                         : ""
//                     }`}
//                   >
//                     {item.stat === "nunggak"
//                       ? "Belum Dibayar"
//                       : item.stat === "pending"
//                       ? "Pending"
//                       : item.stat === "lunas"
//                       ? "Sudah Lunas"
//                       : ""}
//                   </span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center text-gray-400 italic">
//               Tidak ada riwayat data
//             </div>
//           )
//         ) : (
//           ""
//         )}
//       </div>
//     </div> */}

// const temp2 = await res2.json();
//       const temp3 = await res3.json();
//       const temp4 = await res4.json();
//       const res2 = await fetch("/api/get-count-approve");
//       const res3 = await fetch("/api/get-count-sudah-bayar");
//       const res4 = await fetch("/api/get-count-belum-bayar");
//       if (temp2.succeed) {
//         setJmlApprove(temp2.data);
//       } else {
//       }
//       if (temp3.succeed) {
//         setJmlSdhBayar(temp3.data);
//       } else {
//       }
//       if (temp4.succeed) {
//         setJmlBlmBayar(temp4.data);
//       } else {
//       }

import { useState, useEffect } from "react";
import CreateTag from "../btn-assets/tag-create";

const CompPengajuan = ({ create, user, setCreate }) => {
  const [awal, setAwal] = useState("");
  const [dataRevisi, setDataRevisi] = useState(null);

  useEffect(() => {
    const Get = async (id_pel) => {
      const res = await fetch(`/api/pem-awal-id-pel?id_pel=${id_pel}`);

      const temp = await res.json();
      if (temp.succeed) {
        setAwal(temp.data[0]);
      }
    };
    const Get2 = async (id_pel) => {
      const res = await fetch(`/api/get-user-revisi?id_pel=${id_pel}`);

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
            {/* Header bulan */}
            <h1 className="text-navBase font-bold text-xl">Bulan</h1>

            {/* 3 kolom → responsif */}
            <div className="flex flex-col md:flex-row w-full gap-3">
              {/* Kolom 1 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className="md:mt-6 text-gray-600">Invoice</h3>
                <h3 className="font-bold break-all">Invoice</h3>

                <h3 className="mt-2 text-gray-600">Nama Pelanggan</h3>
                <h3 className="font-bold">nama</h3>
              </div>

              {/* Kolom 2 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className=" md:mt-6 text-gray-600">Pemakaian</h3>
                <h3 className="font-bold">asdasdsd</h3>

                <h3 className="mt-2 text-gray-600">ID Pelanggan</h3>
                <h3 className="font-bold">sadsad</h3>
              </div>

              {/* Kolom 3 */}
              <div className="flex flex-col w-full md:w-1/3">
                <h3 className="md:mt-6 text-gray-600">Status Pembayaran</h3>
                <h3 className={`font-bold `}>asdadsa</h3>

                {/* Tombol */}
                <button
                  onClick={() => {
                    alert("Haloo");
                  }}
                  className="font-bold mt-4 shadow-md w-fit px-6 py-2 rounded-full bg-navBase text-white hover:-translate-y-0.5 transition duration-300 text-sm"
                >
                  asdadasasd
                </button>
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
