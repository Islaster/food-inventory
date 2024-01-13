import { Routes, Route } from "react-router-dom";
import "./App.css";
import Inventory from "./pages/inventory/inventory";
import CreatePage from "./pages/create/create";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
