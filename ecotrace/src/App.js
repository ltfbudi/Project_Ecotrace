import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Utama from "./components/utama";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import TheApp from "./components/theApp";

function Layout({ children }) {
  const location = useLocation();
  const hide = ["/"];
  const show = !hide.includes(location.pathname);

  return (
    <div>
      {show && <Navbar />}
      <div>{children}</div>
    </div>
  );
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
        <Layout>
          <Routes>
            <Route path="/" element={<Utama setUser={setUser} />} />
            <Route
              path="/dashboard"
              element={<TheApp page={"Dashboard"} user={user} />}
            />
            <Route
              path="/tagihan"
              element={<TheApp page={"Tagihan"} user={user} />}
            />
            <Route
              path="/riwayat"
              element={<TheApp page={"Riwayat"} user={user} />}
            />
            <Route
              path="/profile"
              element={<TheApp page={"Profile"} user={user} />}
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
