import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Inventory from "./pages/inventory/inventory";
import CreatePage from "./pages/create/create";
import LandingPage from "./pages/landing/LandingPage";
import SignUpPage from "./pages/signup/SignupPage";
import SignInPage from "./pages/signin/SignInPage";

function App() {
  const [user, setUser] = useState({});
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
