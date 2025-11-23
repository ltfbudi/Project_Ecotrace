const CompStruk = ({ data, setStruk }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto w-full">
      <div className="bg-white w-2/5 rounded-xl p-3">
        <div className="flex w-full justify-end">
          <button
            onClick={() => {
              setStruk(false);
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
          Struk Pembayaran
        </h1>
      </div>
    </div>
  );
};

export default CompStruk;
