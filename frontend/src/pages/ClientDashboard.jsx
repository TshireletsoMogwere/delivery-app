import React from "react";
import { PackageSearch, History, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClientDashboard() {
  return (
    <div className="pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#1E293B]">
          Welcome to JoziDrop
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create a Delivery */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#1E293B]">
                Send a Package
              </h2>
              <PlusCircle className="text-[#0F172A]" size={28} />
            </div>
            <p className="text-gray-600 mb-4">
              Create a new delivery request, drop off your package at a taxi
              rank, and track it all the way to the destination.
            </p>
            <Link to='/deliver'>
            <button className="bg-[#0F172A] text-white w-full py-2 rounded-lg font-medium hover:bg-[#1E293B]">
              Create Delivery
            </button>
             </Link>
          </div>

          {/* Track Deliveries */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col justify-between">
            <Link to="/track">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#1E293B]">
                  Track Your Deliveries
                </h2>
                <PackageSearch className="text-[#0F172A]" size={28} />
              </div>
              <p className="text-gray-600 mb-4">
                Monitor your active deliveries in real time and stay informed at
                every step.
              </p>
              <button className="border border-[#0F172A] text-[#0F172A] w-full py-2 rounded-lg font-medium hover:bg-[#F1F5F9]">
                View Active Deliveries
              </button>
            </Link>
          </div>

          {/* Delivery History */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#1E293B]">
                Delivery History
              </h2>
              <History className="text-[#0F172A]" size={28} />
            </div>
            <p className="text-gray-600 mb-4">
              Access a detailed record of your previous deliveries for quick
              reference and easy repeat orders.
            </p>
            <button className="text-[#0F172A] w-full py-2 rounded-lg font-medium hover:bg-[#F1F5F9]">
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
