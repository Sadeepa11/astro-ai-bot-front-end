import "./globals.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export const metadata = {
  title: "AI-Bot Admin",
  description: "Admin Panel for Flask API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
