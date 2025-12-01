import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
import Shop from "./Shop";
import Camera from "./Camera";
import Member from "./Member";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Redirect root / → /en/home (default language) */}
        <Route path="/" element={<Navigate to="/en/home" replace />} />

        {/* ALL LANGUAGE ROUTES */}
        <Route path="/:lang/home" element={<Home />} />
        <Route path="/:lang/shop" element={<Shop />} />
        <Route path="/:lang/camera" element={<Camera />} />
        <Route path="/:lang/member" element={<Member />} />

      </Routes>
    </Router>
  );
}
