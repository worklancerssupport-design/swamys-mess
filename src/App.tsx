import { Routes, Route } from "react-router-dom";
import ConsolePage from "./console/ConsolePage";
import WebsitePage from "./WebsitePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WebsitePage />} />
      <Route path="/console" element={<ConsolePage />} />
    </Routes>
  );
}
