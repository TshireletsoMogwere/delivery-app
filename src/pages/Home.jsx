import { useState } from "react";
import { motion } from "framer-motion"; 
import { User } from "lucide-react"; 
import { Link } from "react-router-dom";

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center text-white">
      {/* Landing Page Content */}
      <div className="text-center p-6 space-y-6">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to DeliverEase
        </motion.h1>
        <motion.p
          className="text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Efficient and Reliable Package Delivery with Taxis at Your Fingertips
        </motion.p>

        {/* Button to Explore */}
        <Link to="/productlist">
        <motion.button
          className="mt-4 px-6 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          Explore Now
        </motion.button>
        </Link>
      </div>

      {/* User Icon in the Header */}
      <header className="absolute top-4 right-4 flex items-center gap-4">
        <button onClick={toggleProfileMenu} className="text-white">
          <User size={24} />
        </button>
        {showProfile && (
          <div className="bg-white text-gray-800 rounded-lg shadow-md p-4 absolute right-0 top-12 w-40">
            <p className="text-center font-semibold">User Profile</p>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">My Account</li>
              <li className="hover:text-blue-600 cursor-pointer">Settings</li>
              <li className="hover:text-blue-600 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}
