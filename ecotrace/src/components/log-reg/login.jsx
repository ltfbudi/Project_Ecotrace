import { useEffect, useState } from "react";
import LoginLogic from "../connection/login-logic";

const Login = ({ con, name, setName }) => {
  const { form, change, handleSubmit } = LoginLogic();

  return (
    <div className="flex items-center bg-white min-h-screen rounded-tl-2xl px-5">
      <div className="flex flex-col gap-5 w-full p">
        <h1 className="pl-6 font-mukta text-4xl font-bold text-navBase mb-4">
          {name}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="noHP"
            value={form.noHP}
            onChange={change}
            className="w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Masukkan Nomor HP"
          />
          <input
            type="password"
            name="pass"
            value={form.pass}
            onChange={change}
            className="w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Masukkan Password"
          />
          <div className="flex w-full gap-3">
            <button
              type="submit"
              className="bg-linear-to-br from-nav to-gray-100 w-32 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-full py-2 text-white font-bold text-md transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
            >
              Masuk
            </button>
            <button
              onClick={() => {
                con(false);
                setName("Daftar");
              }}
              className="bg-white w-32 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-full py-2 text-navBase font-bold text-md transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
              type="button"
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
