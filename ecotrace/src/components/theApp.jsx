import { useState } from "react";
import CompDash from "./assets/comp-dash";
import CompTagihan from "./assets/comp-tagihan";
import DashAdm from "./assets/dash-admin";
import NotFound from "./assets/notFound";
import TagAdm from "./assets/tag-admin";
import CompProfile from "./assets/comp-profile";
import RiwAdmin from "./assets/riw-admin";
import RiwUser from "./assets/riw-user";
import CompPengajuan from "./assets/comp-pengajuan";

const TheApp = ({ page, user }) => {
  const [create, setCreate] = useState(false);
  const role = user.role;

  return (
    <div className="flex flex-col font-Inter pt-4 px-4 sm:px-8">
      {/* HEADER PAGE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Title */}
        <h1 className="text-navBase font-bold text-2xl order-1">{page}</h1>

        {/* Admin + Tagihan Button */}
        {page === "Tagihan" && role === "admin" && (
          <button
            onClick={() => setCreate(true)}
            className="bg-navBase text-white font-bold rounded-2xl px-4 py-2 text-sm flex items-center gap-2 w-fit order-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 1 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
            Tambah Tagihan
          </button>
        )}
        {page === "Pengajuan" && role === "user" && (
          <button
            onClick={() => setCreate(true)}
            className="bg-navBase text-white font-bold rounded-2xl px-4 py-2 text-sm flex items-center gap-2 w-fit order-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 1 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
            Tambah Pengajuan
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div
        className={`${
          page === "Profile" ? "" : "mt-6"
        } w-full flex flex-col justify-center items-center gap-5`}
      >
        {role === "user" ? (
          page === "Dashboard" ? (
            <CompDash user={user} />
          ) : page === "Tagihan" ? (
            <CompTagihan user={user} />
          ) : page === "Riwayat" ? (
            <RiwUser user={user} />
          ) : page === "Pengajuan" ? (
            <CompPengajuan create={create} user={user} setCreate={setCreate} />
          ) : page === "Profile" ? (
            <CompProfile user={user} />
          ) : (
            <NotFound />
          )
        ) : role === "admin" ? (
          page === "Dashboard" ? (
            <DashAdm user={user} />
          ) : page === "Tagihan" ? (
            <TagAdm user={user} create={create} setCreate={setCreate} />
          ) : page === "Riwayat" ? (
            <RiwAdmin />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TheApp;
