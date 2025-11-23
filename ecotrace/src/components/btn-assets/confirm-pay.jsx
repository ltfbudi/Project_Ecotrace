const ConfirmPay = ({ setBukti, data }) => {
  const approve = async (invo) => {
    const res = await fetch(`/api/confirm-pay?invoice=${invo}`, {
      method: "POST",
    });

    const temp = await res.json();
    if (temp.succeed) {
      alert(temp.message);
      window.location.reload();
    } else {
      alert(temp.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto w-full">
      <div className="bg-white rounded-xl w-3/5 px-5 py-4">
        <div className="flex w-full justify-end">
          <button
            onClick={() => {
              setBukti(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x text-gray-500"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
        <h1 className="text-center text-2xl text-gray-500 font-Inter">
          Bukti Pembayaran Pelanggan
        </h1>
        <div className="w-full flex justify-center">
          <div className="w-60 h-80 flex justify-center items-center align-middle ">
            <img
              src={data.url}
              alt="preview"
              className="w-full h-full align-middle"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              approve(data.invoice);
            }}
            className="font-bold mt-4 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] w-fit px-6 rounded-full py-1 bg-navBase text-white transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPay;
