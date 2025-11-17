// user.length > 0 ? (
//                 user.map((item, index) => (
//                   <tr
//                     key={index}
//                     className="border-b text-center hover:bg-gray-50"
//                   >
//                     <td className="px-4 py-2">{item.noHP}</td>
//                     <td className="px-4 py-2">{item.pemakaian}</td>
//                     <td className="px-4 py-2">
//                       Rp {Number(item.biaya).toLocaleString("id-ID")}
//                     </td>
//                     <td
//                       className={`px-4 py-2 font-medium ${
//                         item.stat === "lunas"
//                           ? "text-green-600"
//                           : item.stat === "pending"
//                           ? "text-yellow-400"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {item.stat}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="px-4 py-3 text-gray-400 text-sm italic"
//                   >
//                     Tidak ada data transaksi
//                   </td>
//                 </tr>
//               )
//             )

// user.length > 0 ? (
//           user.map((item, index) => (
//             <div
//               key={index}
//               className={`${
//                 index === 0 ? "" : "mt-5"
//               } px-8 py-5 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-2xl`}
//             >
//               <h1 className="text-navBase font-bold text-lg">Januari</h1>
//               <div className="flex w-full">
//                 <div className="flex flex-col w-1/3">
//                   <h3 className="mt-6">Invoice</h3>
//                   <h3 className="font-bold">No.Pelanggan</h3>

//                   <h3 className="mt-4">Nama Pelanggan</h3>
//                   <h3 className="font-bold">{item.nama}</h3>
//                 </div>
//                 <div className="flex flex-col w-1/3">
//                   <h3 className="mt-6">Pemakaian</h3>
//                   <h3 className="font-bold">{item.pemakaian}</h3>

//                   <h3 className="mt-4">No. Pelanggan</h3>
//                   <h3 className="font-bold">Nomor Pelanggan</h3>
//                 </div>
//                 <div className="flex flex-col w-1/3">
//                   <h3 className="mt-6">Status Pembayaran</h3>
//                   <h3
//                     className={`${
//                       item.stat === "nunggak"
//                         ? "text-red-500"
//                         : item.stat === "pending"
//                         ? "text-yellow-300"
//                         : item.stat === "lunas"
//                         ? "text-green-400"
//                         : ""
//                     } font-bold`}
//                   >
//                     {item.stat === "nunggak"
//                       "? "Belum Bayar"
//                       : item.stat === "pending"
//                       ? "Pending"
//                       : item.stat === "lunas"
//                       ? "Sudah Bayar"
//                       : """}
//                   </h3>
//                   <button
//                     onClick={() => {
//                       ""
//                     }}
//                     className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 bg-navBase text-white transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
//                   >
//                     {item.stat === "nunggak"
//                       ? "Bayar Tagihan"
//                       : item.stat === "pending"
//                       ? "Unduh Bukti"
//                       : item.stat === "lunas"
//                       ? "Unduh Struk"
//                       : ""}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center font-bold font-Inter flex items-center justify-center">
//             Tidak dapat memuat data
//           </div>
//         )
//       )
