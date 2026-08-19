import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [status, setStatus] = useState<string>("checking...");

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("unreachable"));
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", textAlign: "center", marginTop: "4rem" }}>
      <h1>Swamy's Mess</h1>
      <p>Mess & Catering Services</p>
      <p style={{ fontSize: "0.875rem", color: "#666" }}>
        API Status: <strong>{status}</strong>
      </p>
    </div>
  );
}
