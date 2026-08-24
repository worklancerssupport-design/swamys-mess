import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ConsolePage from "./console/ConsolePage";
import WebsitePage from "./WebsitePage";
import MealsPage from "./meals/MealsPage";
import CateringLandingPage from "./catering/CateringLandingPage";
import MenuRoutePage from "./menu/MenuRoutePage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WebsitePage />} />
        <Route path="/menu" element={<MenuRoutePage />} />
        <Route path="/meals" element={<MealsPage />} />
        <Route path="/catering" element={<CateringLandingPage />} />
        <Route path="/console" element={<ConsolePage />} />
      </Routes>
    </>
  );
}
