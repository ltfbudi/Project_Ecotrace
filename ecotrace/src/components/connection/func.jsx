const Func = async (nopel, setData) => {
  const res = await fetch(`/api/data-transaksi?No_Pel=${nopel}`);
  const data = await res.json();
  if (data.succeed) {
    setData(data.trans);
  }
};
export default Func;
