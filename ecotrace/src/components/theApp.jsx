import { useState } from "react";
import CompDash from "./assets/comp-dash";
import CompTagihan from "./assets/comp-tagihan";
import DashAdm from "./assets/dash-admin";
import NotFound from "./assets/notFound";
import TagAdm from "./assets/tag-admin";
import CompProfile from "./assets/comp-profile";
import RiwAdmin from "./assets/riw-admin";
import RiwUser from "./assets/riw-user";

const TheApp = ({ page, user }) => {
  const [create, setCreate] = useState(false);
  const role = user.role;
  return (
    <div className="flex flex-col font-Inter pt-4">
      {page === "Tagihan" ? (
        role === "admin" ? (
          <div className="w-full flex px-18">
            <h1 className="w-2/3 text-navBase font-bold text-2xl">{page}</h1>
            <div className="w-1/3 flex justify-end">
              <button
                onClick={() => {
                  setCreate(true);
                }}
                className="bg-navBase text-white font-bold rounded-2xl p-3 text-sm flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="bi bi-plus-lg font-bold"
                  viewBox="0 1 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                  />
                </svg>
                Tagihan
              </button>
            </div>
          </div>
        ) : (
          <h1 className="px-18 w-2/3 text-navBase font-bold text-2xl">
            {page}
          </h1>
        )
      ) : (
        <h1 className="px-18 w-2/3 text-navBase font-bold text-2xl">{page}</h1>
      )}

      <div
        className={`${
          page === "Profile" ? "" : "mt-8"
        } w-full flex flex-col justify-center items-center gap-5`}
      >
        {role === "user" ? (
          page === "Dashboard" ? (
            <CompDash user={user} />
          ) : page === "Tagihan" ? (
            <CompTagihan user={user} />
          ) : page === "Riwayat" ? (
            <RiwUser user={user} />
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
