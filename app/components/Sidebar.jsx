"use client";

import Link from "next/link";
import { Home, Users, MapPin, Clock, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: <Home size={20} /> },
    { href: "/clients", label: "Clients", icon: <Users size={20} /> },
    { href: "/cities", label: "Cities", icon: <MapPin size={20} /> },
    { href: "/nirayana", label: "Nirayana", icon: <Clock size={20} /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Mobile Drawer */}
      <aside
        role="dialog"
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 font-bold text-xl text-white flex justify-between items-center border-b border-gray-700">
          AI-Bot Admin
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-800 transition"
          >
            <X size={22} className="text-gray-400" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-2 transition ${
                pathname === link.href
                  ? "bg-gray-700 text-white font-semibold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-64 bg-gray-900 shadow-lg flex-col z-30"
      >
        <div className="p-6 font-bold text-xl text-white border-b border-gray-700">
          AI-Bot Admin
        </div>

        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-2 transition ${
                pathname === link.href
                  ? "bg-gray-700 text-white font-semibold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;