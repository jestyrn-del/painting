import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import CookieBanner from "./components/CookieBanner/CookieBanner";

import "../public/Assets/Fonts/Mazzard/Mazzard-use.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/painting" element={<Home />} />
        <Route path="/painting/development" element={<NotFoundPage />} />
        <Route path="/painting/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/painting/development" replace />} />
      </Routes>

      <CookieBanner />
    </>
  );
}