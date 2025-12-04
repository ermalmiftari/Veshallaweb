import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Footer from "../components/Footer";

import Home from "./Home";
import Shop from "./Shop";
import Camera from "./Camera";
import Member from "./Member";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black">
        
        {/* PAGE CONTENT */}
        <main className="flex-grow">
          <Routes>
            {/* Redirect root → default language */}
            <Route path="/" element={<Navigate to="/en/home" replace />} />

            {/* Multilingual routes */}
            <Route path="/:lang/home" element={<Home />} />
            <Route path="/:lang/shop" element={<Shop />} />
            <Route path="/:lang/camera" element={<Camera />} />
            <Route path="/:lang/member" element={<Member />} />
          </Routes>
        </main>

        {/* GLOBAL FOOTER ON ALL PAGES */}
        <Footer />
      </div>
    </Router>
  );
}
