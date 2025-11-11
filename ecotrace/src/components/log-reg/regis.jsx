import { useState } from "react";
import RegisLogic from "../connection/regis-logic";

const Regis = ({ con, name, setName }) => {
  const { form, change, handleSubmit } = RegisLogic(con, setName);

  return (
    <div className="flex items-center bg-white min-h-screen rounded-tl-2xl px-5">
      <div className="flex flex-col gap-5 w-full p">
        <h1 className="pl-6 font-mukta text-4xl font-bold text-navBase mb-4">
          {name}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={change}
            className="w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Nama Lengkap"
          />
          <input
            type="password"
            name="pass"
            value={form.pass}
            onChange={change}
            className="w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Kata Sandi"
          />
          <input
            type="text"
            name="noHP"
            value={form.noHP}
            onChange={change}
            className="w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Nomor Telepon"
          />
          <div className="flex w-full gap-3">
            <button
              className="bg-white w-32 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-full py-2 text-navBase font-bold text-md transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
              type="submit"
            >
              Daftar
            </button>
          </div>
        </form>
        <div className="text-navBase flex">
          <h1>Sudah Punya akun? &nbsp;</h1>
          <a
            onClick={() => {
              con(true);
              setName("Masuk");
            }}
          >
            {" "}
            Click Di sini!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Regis;
