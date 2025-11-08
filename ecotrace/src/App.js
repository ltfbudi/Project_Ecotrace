import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Utama from "./components/utama";
import Tagihan from "./components/tagihan";

function App() {
  return (
    <div>
      <Navbar />
      <Tagihan />
    </div>
  );
}

export default App;
