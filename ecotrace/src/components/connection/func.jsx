const Func = async (noHP, setTrans) => {
  const res = await fetch(`/api/data-transaksi?noHP=${noHP}`);
  const data = await res.json();
  if (data.succeed) {
    setTrans(data.trans);
  }
};
export default Func;
