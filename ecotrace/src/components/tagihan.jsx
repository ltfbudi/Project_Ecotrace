import { useState } from "react";
import CompTagihan from "./assets/comp-tagihan";

const Tagihan = () => {
  const [cond, setCond] = useState("nunggak");
  return (
    <div className="flex flex-col font-Inter">
      <h1 className="pl-18 pt-3 text-navBase font-bold text-2xl">Tagihan</h1>
      <div className="mt-8 w-full flex flex-col justify-center items-center gap-5">
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
        <CompTagihan cond={cond} />
      </div>
    </div>
  );
};

export default Tagihan;
