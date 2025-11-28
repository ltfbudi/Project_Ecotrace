import { useState } from "react";
import Regis from "./log-reg/regis";
import Login from "./log-reg/login";

const Utama = ({ setUser }) => {
  const [name, setName] = useState("Masuk");
  const [condition, setCon] = useState(true);

  return (
    <div className="bg-nav min-h-screen">
      <div className="flex flex-col lg:flex-row justify-center items-center  text-black min-h-screen">
        <div className="w-full lg:w-3/5 text-center text-amber-50 h-1/3 flex flex-col justify-center items-center lg:flex-none">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-Inter font-bold">
            ecotrace.
          </h1>
          <h3 className="text-sm md:text-md mt-2 w-4/6">
            Aplikasi Pencatat Meter Air di KSM Bayu Bening Eco Fresh
          </h3>
        </div>
        <div className="w-5/6 md:w-5/6 lg:w-2/5 mt-4 lg:mt-0 bg-white rounded-4xl lg:rounded-b-none lg:rounded-tl-xl lg:rounded-tr-none shadow-lg">
          {condition ? (
            <Login
              con={setCon}
              name={name}
              setName={setName}
              setUser={setUser}
            />
          ) : (
            <Regis con={setCon} name={name} setName={setName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Utama;
