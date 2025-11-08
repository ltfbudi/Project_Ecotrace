import { useEffect, useState } from "react";
import CompDash from "./assets/comp-dash";
import Func from "./connection/func";

const Dashboard = ({ user }) => {
  const [trans, setTrans] = useState([]);
  const noHP = user.noHP;

  useEffect(() => {
    if (noHP) {
      Func(noHP, setTrans);
    }
  }, [noHP]);

  return (
    <div className="flex flex-col font-Inter">
      <h1 className="pl-18 pt-3 text-navBase font-bold text-2xl">Dashboard</h1>
      <div className="mt-8 w-full flex flex-col justify-center items-center gap-5">
        <CompDash data={trans} />
      </div>
    </div>
  );
};

export default Dashboard;
