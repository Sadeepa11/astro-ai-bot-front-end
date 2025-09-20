// app/layout.jsx
"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 min-h-screen overflow-x-hidden`}
      >
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Content wrapper */}
          <div className="flex-1 flex flex-col min-w-0 md:ml-64">
            {/* Topbar */}
            <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

            {/* Page body */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}