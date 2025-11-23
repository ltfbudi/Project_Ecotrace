const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 left-0 w-full shadow-md shadow-gray-400 flex py-4 px-6">
      <div className="w-1/5">
        <a href="/" className="font-bold font-Inter text-navBase text-5xl">
          ecotrace.
        </a>
      </div>
      <div className="flex justify-end items-center gap-9 w-2/3 pr-12 text-lg font-Inter text-nav">
        <a href="/dashboard">Dashboard</a>
        <a href="/tagihan">Tagihan</a>
        <a href="/riwayat">Riwayat</a>
      </div>
      <div className="flex  w-1/5 text-nav justify-center items-center text-lg font-Inter gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4 text-icon"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <a href="/profile">Profile</a>
      </div>
    </nav>
  );
};

export default Navbar;
