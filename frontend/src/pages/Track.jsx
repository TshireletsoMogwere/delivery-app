import { useState, useEffect } from "react";
import { Truck, CheckCircle } from "lucide-react";

const steps = ["Preparing", "Out for Delivery", "Delivered"];

export default function Track() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Delivery Status</h2>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className={`flex items-center gap-2 ${i <= statusIndex ? "text-green-600" : "text-gray-400"}`}>
            {i <= statusIndex ? <CheckCircle /> : <Truck />} <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}