const Get = async (setData) => {
  const res = await fetch("/api/get-user-all");
  const temp = await res.json();
  if (temp.succeed) {
    setData(temp.data);
  }
};

export default Get;
