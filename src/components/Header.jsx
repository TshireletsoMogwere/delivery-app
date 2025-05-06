import { PackageCheck} from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center p-4 shadow bg-white">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl">
        <PackageCheck /> DeliverEase
      </Link>
      <nav className="flex gap-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/track" className="hover:text-blue-600">Track</Link>
      </nav>
    </header>
  );
}
