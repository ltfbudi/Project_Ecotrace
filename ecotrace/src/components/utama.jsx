import React, { useEffect, useState } from "react";
import Regis from "./log-reg/regis";
import Login from "./log-reg/login";

const Utama = () => {
  const [name, setName] = useState("Masuk");
  const [condition, setCon] = useState(true);

  return (
    <div className="bg-nav min-h-screen">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-3/5 text-center text-amber-50">
          <h1 className="text-6xl font-Inter font-bold">ecotrace.</h1>
          <h3 className="text-md">
            Aplikasi Pencatat Meter Air di KSM Bayu Bening Eco Fresh
          </h3>
        </div>
        <div className="w-2/5">
          {condition ? (
            <Login con={setCon} name={name} setName={setName} />
          ) : (
            <Regis con={setCon} name={name} setName={setName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Utama;
