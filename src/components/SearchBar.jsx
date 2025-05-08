import React from "react";
import { Search as SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center border rounded-lg px-3 py-2 w-full max-w-md bg-white shadow-sm">
      <SearchIcon className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        className="outline-none w-full text-sm"
      />
    </div>
  );
}
