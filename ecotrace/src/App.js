import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Utama from "./components/utama";
import Tagihan from "./components/tagihan";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Utama />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tagihan" element={<Tagihan />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
