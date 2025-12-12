import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile default closed

  return (
    <div className="flex min-h-screen w-full bg-base-200">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <Topbar setIsSidebarOpen={setIsSidebarOpen} />

        <main className="p-4 sm:p-6">
          <div className="min-h-[calc(100vh-64px)] rounded-xl bg-base-100 p-4 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;