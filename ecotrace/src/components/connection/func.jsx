const Func = async (noHP) => {
  const res = await fetch(`/api/data-transaksi?noHP=${noHP}`);
  const data = await res.json();
};
export default Func;
