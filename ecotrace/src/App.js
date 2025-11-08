import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Utama from "./components/utama";
import Tagihan from "./components/tagihan";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { json } from "express";

function Layout() {
  const location = useLocation;
  const hide = ["/"];

  const shows = !hide.includes(location.pathname);

  return <>{shows && <Navbar />}</>;
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Utama setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tagihan" element={<Tagihan />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
