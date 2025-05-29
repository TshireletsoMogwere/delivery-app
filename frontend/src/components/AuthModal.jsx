import { useState, useEffect } from "react";
import {
  X,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  // Reset form when modal opens/closes or when switching tabs
  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      setSuccessMessage("");
      setIsLoading(false);
    }
  }, [isOpen, isSignup]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignup) {
      // Full name validation
      if (!formData.full_name.trim()) {
        newErrors.full_name = "Full name is required";
      } else if (formData.full_name.trim().length < 2) {
        newErrors.full_name = "Full name must be at least 2 characters";
      }

      // Phone number validation
      const phoneRegex = /^[0-9+\-\s()]+$/;
      if (!formData.phone_number) {
        newErrors.phone_number = "Phone number is required";
      } else if (
        !phoneRegex.test(formData.phone_number) ||
        formData.phone_number.length < 10
      ) {
        newErrors.phone_number = "Please enter a valid phone number";
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    const url = isSignup
      ? `https://backend-k2kh.onrender.com/api/auth/register`
      : `https://backend-k2kh.onrender.com/api/auth/login`;

    // For login, send only email and password
    const payload = isSignup
      ? {
          full_name: formData.full_name.trim(),
          email: formData.email.toLowerCase().trim(),
          phone_number: formData.phone_number.trim(),
          password: formData.password,
        }
      : {
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle specific error messages from backend
        if (data.errors && Array.isArray(data.errors)) {
          const fieldErrors = {};
          data.errors.forEach((error) => {
            if (error.field) {
              fieldErrors[error.field] = error.message;
            }
          });
          setErrors(fieldErrors);
        } else {
          setErrors({
            general: data.error || data.message || "Something went wrong",
          });
        }
      } else {
        setSuccessMessage(
          isSignup
            ? "Registration successful! You can now login."
            : "Login successful!"
        );

        // Store token if provided
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }

        // Close modal after success
        setTimeout(() => {
          onClose();
          // Reload page or redirect as needed
          if (!isSignup) {
            window.location.reload();
          }
        }, 1500);
      }
    } catch (err) {
      setErrors({ general: "Failed to connect to server. Please try again." });
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (signup) => {
    setIsSignup(signup);
    setErrors({});
    setSuccessMessage("");
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto scroll-smooth"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <User size={32} />
            </div>

            <p className="text-white/80 mt-1">
              {isSignup ? "Join JoziDrop today" : "Sign in to your account"}
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => switchMode(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                !isSignup
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchMode(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200${
                isSignup
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              <CheckCircle size={20} />
              <span className="text-sm font-medium">{successMessage}</span>
            </div>
          )}

          {/* General Error */}
          {errors.general && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{errors.general}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                {/* Full Name */}
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label> */}
                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Enter your full name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.full_name
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.full_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.full_name}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label> */}
                  <div className="relative">
                    <Phone
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="tel"
                      name="phone_number"
                      placeholder="Enter your phone number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.phone_number
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.phone_number && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone_number}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Email */}
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label> */}
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label> */}
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password (Signup only) */}
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.confirmPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>
                    {isSignup ? "Creating Account..." : "Signing In..."}
                  </span>
                </>
              ) : (
                <span>{isSignup ? "Create Account" : "Sign In"}</span>
              )}
            </button>
          </form>

          {/* Footer */}
          {!isSignup && (
            <div className="text-center mt-4">
              <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                Forgot your password?
              </button>
            </div>
          )}

          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => switchMode(!isSignup)}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
