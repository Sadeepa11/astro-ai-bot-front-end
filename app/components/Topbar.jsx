"use client";

import { Menu } from "lucide-react";

const Topbar = () => {
  return (
    <header className="h-16 bg-white shadow flex items-center px-6 justify-between">
      <div className="flex items-center gap-2">
        <Menu className="md:hidden" />
        <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>
        <img
          src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
          alt="Admin Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Topbar;
