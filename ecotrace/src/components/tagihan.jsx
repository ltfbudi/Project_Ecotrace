import CompTagihan from "./assets/comp-tagihan";
import Func from "./connection/func";
import { useState, useEffect } from "react";

const Tagihan = ({ user }) => {
  const [trans, setTrans] = useState([]);
  const [temp, setTemp] = useState("hey");
  const noHP = user.noHP;

  useEffect(() => {
    if (noHP) {
      Func(noHP, setTrans);
    }
  }, [noHP]);

  return (
    <div className="flex flex-col font-Inter">
      <h1 className="pl-18 pt-3 text-navBase font-bold text-2xl">Tagihan</h1>
      <div className="mt-8 w-full flex flex-col justify-center items-center gap-5">
        <CompTagihan data={trans} setTemp={setTemp} />
      </div>
    </div>
  );
};

export default Tagihan;
