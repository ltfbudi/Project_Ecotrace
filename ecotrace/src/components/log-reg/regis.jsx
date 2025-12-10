import RegisLogic from "../connection/regis-logic";

const Regis = ({ con, name, setName }) => {
  const { form, change, handleSubmit } = RegisLogic(con, setName);

  return (
    <div className="flex items-center bg-white lg:min-h-screen rounded-xl lg:rounded-tl-2xl px-5">
      <div className="flex flex-col gap-4 w-full p">
        <h1 className="pl-6 font-mukta text-4xl font-bold text-navBase mb-0 lg:mb-4 mt-4 lg:mt-0 text-center lg:text-start">
          {name}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={change}
            className="w-full lg:w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Nama Lengkap"
          />
          <input
            type="password"
            name="pass"
            value={form.pass}
            onChange={change}
            className="w-full lg:w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Kata Sandi"
          />

          <input
            type="password"
            name="passConfirm"
            value={form.passConfirm}
            onChange={change}
            className="w-full lg:w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Confirm Kata Sandi"
          />
          <h1
            className={`${
              form.pass.length > 7 ? "text-green-500" : "text-gray-300"
            } pl-5 text-sm`}
          >
            {form.pass.length > 7
              ? "Password memenuhi standar :)"
              : "Password harus 8 - 16 karakter"}
          </h1>
          <h1
            className={`${
              form.passConfirm.length < 1 ? "hidden" : ""
            } pl-5 text-sm ${
              form.pass === form.passConfirm ? "text-green-500" : "text-red-500"
            }`}
          >
            {form.pass === form.passConfirm
              ? "Password Cocok!"
              : "Password Tidak Cocok!"}
          </h1>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={change}
            className="w-full lg:w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="example@gmail.com"
          />
          <input
            type="text"
            name="noHP"
            value={form.noHP}
            onChange={change}
            className="w-full lg:w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Nomor Telepon"
          />
          <input
            type="text"
            name="alamat"
            value={form.alamat}
            onChange={change}
            className="w-full lg:w-4/5 border border-gray-400 rounded-full text-gray-800 placeholder-gray-300 h-11 px-5 focus:rounded-full focus:outline-gray-500"
            placeholder="Alamat Lengkap"
          />

          <div className="flex w-full gap-3 justify-center lg:justify-normal">
            <button
              className="bg-white w-32 shadow-[0_0_6px_1px_rgba(0,0,0,0.2)] rounded-full py-2 text-navBase font-bold text-md transform hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-300"
              type="submit"
            >
              Daftar
            </button>
          </div>
        </form>
        <div className="text-navBase flex mb-4 justify-center lg:justify-normal">
          <h1>Sudah Punya akun? &nbsp;</h1>
          <a
            onClick={() => {
              con(true);
              setName("Masuk");
            }}
          >
            {" "}
            Click Di sini!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Regis;
