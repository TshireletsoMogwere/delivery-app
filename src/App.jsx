import { Routes, Route } from "react-router-dom";
 import Header from "./components/Header";
 import Track from "./pages/Track";

export default function App() {
  return (
    <div className="h-screen bg-gray-50 text-gray-800">
      <Header />
      <Routes>
    
        <Route path="/track" element={<Track />} />
      </Routes>
    </div>
  );
}


