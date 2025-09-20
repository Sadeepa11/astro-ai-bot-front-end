"use client";

import { Menu } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-gray-900 shadow flex items-center px-4 sm:px-6 justify-between sticky top-0 z-30">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-gray-800 transition md:hidden"
        >
          <Menu className="w-6 h-6 text-gray-200" />
        </button>

        {/* Example title (optional) */}
        {/* <h1 className="text-lg sm:text-xl font-semibold text-white">
          Dashboard
        </h1> */}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="hidden sm:block text-gray-300">Admin</span>
        <img
          src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
          alt="Admin Avatar"
          className="w-8 h-8 rounded-full border border-gray-700"
        />
      </div>
    </header>
  );
};

export default Topbar;