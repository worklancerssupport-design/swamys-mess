import { Routes, Route } from "react-router-dom";
import ConsolePage from "./console/ConsolePage";
import WebsitePage from "./WebsitePage";
import MealsPage from "./meals/MealsPage";
import CateringLandingPage from "./catering/CateringLandingPage";
import MenuRoutePage from "./menu/MenuRoutePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WebsitePage />} />
      <Route path="/menu" element={<MenuRoutePage />} />
      <Route path="/meals" element={<MealsPage />} />
      <Route path="/catering" element={<CateringLandingPage />} />
      <Route path="/console" element={<ConsolePage />} />
    </Routes>
  );
}
