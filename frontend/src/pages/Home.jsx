import { useState, useEffect } from "react";
import {
  ArrowRight,
  Package,
  Clock,
  Shield,
  Star,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Package,
      title: "Smart Tracking",
      desc: "Real-time GPS tracking for every package",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      desc: "Average delivery time under 45 minutes",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      desc: "Insurance covered with verified drivers",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "JoziDrop saved my business. Lightning fast deliveries!",
      rating: 5,
    },
    {
      name: "Mike T.",
      text: "Most reliable delivery service in Johannesburg.",
      rating: 5,
    },
    {
      name: "Lisa K.",
      text: "Professional drivers, always on time. Highly recommend!",
      rating: 5,
    },
  ];

  const stats = [
    { number: "50K+", label: "Deliveries Made" },
    { number: "98%", label: "On-Time Rate" },
    { number: "4.9", label: "User Rating" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className=" bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_40%)]"></div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="md:hidden p-2"
      >
        {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-4 space-y-4">
            <a
              href="#features"
              className="block hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="block hover:text-blue-400 transition-colors"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="block hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
            <hr className="border-white/10" />
            <button className="block w-full text-left hover:text-blue-400 transition-colors">
              My Account
            </button>
            <button className="block w-full text-left hover:text-blue-400 transition-colors">
              Settings
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Lightning Fast
              </span>
              <br />
              <span className="text-white">Delivery Service</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
              Transform your delivery experience with JoziDrop's network of
              verified taxi drivers. Get your packages delivered across
              Johannesburg in record time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-600">
            <Link to="/productlist">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <span>Start Delivering Now</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
            <button className="px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-800">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose JoziDrop?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built for the modern world, designed for Johannesburg's unique
              delivery challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-24 px-6 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            What Our Users Say
          </h2>

          <div className="relative h-48 overflow-hidden">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-500 ${
                  i === currentTestimonial
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star
                        key={j}
                        size={20}
                        className="text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-xl italic mb-4">"{testimonial.text}"</p>
                  <p className="text-blue-400 font-semibold">
                    — {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentTestimonial
                    ? "bg-blue-400 w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience the Future of Delivery?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust JoziDrop for their
            delivery needs.
          </p>
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-3 mx-auto">
            <span>Get Started Today</span>
            <ArrowRight
              size={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              JoziDrop
            </div>
            <p className="text-gray-400">
              Revolutionizing delivery in Johannesburg, one package at a time.
            </p>
          </div>
          <div className="text-center text-gray-500 text-sm">
            © 2025 JoziDrop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
