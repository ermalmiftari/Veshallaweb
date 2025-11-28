import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Shop from "./Shop";
import Camera from "./Camera";
import Member from "./Member";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/member" element={<Member />} />
      </Routes>
    </Router>
  );
}
