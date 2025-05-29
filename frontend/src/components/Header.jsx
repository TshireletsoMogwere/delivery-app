import {
  PackageCheck,
  User,
  Home,
  MapPin,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setShowProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleProfileMenu = () => {
    setIsAuthOpen(true);
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setShowProfile(!showProfile);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/track", label: "Track", icon: MapPin },
    // { to: "/services", label: "Services" },
    // { to: "/about", label: "About" },
    // { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
            : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl group transition-all duration-200"
            >
              <div className="p-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-200">
                <PackageCheck size={24} className="text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JoziDrop
              </span>
            </Link>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105"
                >
                  {link.icon && <link.icon size={18} />}
                  <span>{link.label}</span>
                </Link>
              ))}
              {/* Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-200 px-4 py-2 rounded-full transition-all duration-200 group"
                >
                  <User
                    size={18}
                    className="text-gray-600 group-hover:text-blue-600"
                  />
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                    Account
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${
                      showProfile ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showProfile && (
                  <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Welcome!
                          </p>
                          <p className="text-sm text-gray-600">
                            Manage your account
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={toggleProfileMenu}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 font-medium"
                      >
                        Sign In / Register
                      </button>
                      {/* <Link
                        to="/dashboard"
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-blue-600"
                        onClick={() => setShowProfile(false)}
                      >
                        My Dashboard
                      </Link> */}
                      <Link
                        to="/orders"
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-blue-600"
                        onClick={() => setShowProfile(false)}
                      >
                        Order History
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 hover:text-blue-600"
                        onClick={() => setShowProfile(false)}
                      >
                        Settings
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors text-red-600 font-medium">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.icon && <link.icon size={20} />}
                  <span>{link.label}</span>
                </Link>
              ))}

              <hr className="my-4 border-gray-200" />

              {/* Mobile Profile Section */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    toggleProfileMenu();
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <User size={20} />
                  <span>Sign In / Register</span>
                </button>

                <Link
                  to="/send-package"
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Send Package
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>
    </>
  );
}
