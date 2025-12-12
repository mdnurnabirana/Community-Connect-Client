import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-base-200">
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "sm:ml-64" : "sm:ml-20"
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