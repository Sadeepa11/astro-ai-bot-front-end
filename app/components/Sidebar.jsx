"use client";

import Link from "next/link";
import { Home, Users, MapPin, Clock } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: <Home size={20} /> },
    { href: "/clients", label: "Clients", icon: <Users size={20} /> },
    { href: "/cities", label: "Cities", icon: <MapPin size={20} /> },
    { href: "/nirayana", label: "Nirayana", icon: <Clock size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
      <div className="p-6 font-bold text-xl text-blue-600">AI-Bot Admin</div>
      <nav className="flex-1 px-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-2 transition ${
              pathname === link.href
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
