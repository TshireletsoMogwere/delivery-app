import { PackageCheck, User, Home, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsAuthOpen(true);
  };

  return (
    <header className=" w-full fixed top-0 left-0 flex justify-between items-center p-4 shadow bg-white z-50">
      {/* Logo and Link to Home */}
      <Link to="/" className="flex items-center gap-2 font-bold text-xl">
        <PackageCheck size={24} /> JoziDrop
      </Link>

      {/* Navigation and User Icon in One Div */}
      <div className="flex items-center gap-6">
        {/* Home Icon */}
        <Link to="/" className="text-gray-600 hover:text-blue-600">
          <Home size={24} />
        </Link>
        
        {/* Track Icon */}
        <Link to="/track" className="text-gray-600 hover:text-blue-600">
          <MapPin size={24} />
        </Link>

        {/* User Icon */}
        <div className="relative">
          <button onClick={toggleProfileMenu} className="text-gray-600 hover:text-blue-600">
            <User size={24} />
          </button>
             {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

        
        </div>
      </div>
    </header>
  );
}
