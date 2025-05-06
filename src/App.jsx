import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
 import Header from "./components/Header";
 import Track from "./pages/Track";
import ProductList from "./pages/ProductList";

export default function App() {
  return (
    <div className="h-screen bg-gray-50 text-gray-800">
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/track" element={<Track />} />
        <Route path="/productlist" element={<ProductList />} />
      </Routes>
    </div>
  );
}


