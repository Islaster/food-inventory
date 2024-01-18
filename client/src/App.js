import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Inventory from "./pages/inventory/inventory";
import CreatePage from "./pages/create/create";
import LandingPage from "./pages/landing/LandingPage";
import SignUpPage from "./pages/signup/SignupPage";
import SignInPage from "./pages/signin/SignInPage";

function App() {
  const [user, setUser] = useState({});
  const navi = useNavigate();
  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={user?.email ? <Navigate to="/inventory" /> : <LandingPage />}
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage navi={navi} />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
