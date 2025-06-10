import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
 import Header from "./components/Header";
 import Track from "./pages/Track";
import ClientDashboard from "./pages/ClientDashboard";
import Order from "./pages/Order";
import Deliver from "./components/Deliver";

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/track" element={<Track />} />
        <Route path="/clientdashboard" element={<ClientDashboard />} />
        <Route path="/order/:id" element={<Order />} />
            <Route path="deliver" element={<Deliver />} />
      </Routes>
    </div>
  );
}


