import { Routes, Route, Link } from "react-router-dom";
import Console from "./Console";

function Home() {
  return (
    <div style={{ fontFamily: "system-ui", textAlign: "center", marginTop: "4rem" }}>
      <h1>Swamy's Mess</h1>
      <p>Mess & Catering Services</p>
      <Link to="/console" style={{ color: "#4f46e5" }}>Admin Console</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/console" element={<Console />} />
    </Routes>
  );
}
