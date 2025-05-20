import { useState } from "react";

const BACKEND_URL = "https://backend-k2kh.onrender.com";

export default function AuthModal({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? `${BACKEND_URL}/api/auth/register`
      : `${BACKEND_URL}/api/auth/login`;

    // For login, send only email and password
    const payload = isSignup
      ? formData
      : {
          email: formData.email,
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
        alert(data.error || "Something went wrong");
      } else {
        alert(isSignup ? "Registration successful!" : "Login successful!");
        onClose();
      }
    } catch (err) {
      alert("Failed to connect to server.");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-80 max-w-full"
      >
        {/* Tabs */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setIsSignup(true)}
            className={`px-4 py-2 rounded ${
              isSignup ? "bg-blue-600 text-white" : "text-blue-600"
            } focus:outline-none`}
          >
            Signup
          </button>
          <button
            onClick={() => setIsSignup(false)}
            className={`px-4 py-2 rounded ${
              !isSignup ? "bg-blue-600 text-white" : "text-blue-600"
            } focus:outline-none`}
          >
            Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                name="full_name"
                placeholder="Full name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
