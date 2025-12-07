import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen ">
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300
        ${isSidebarOpen ? "ml-64" : "ml-20"}`}
      >
        <Topbar setIsSidebarOpen={setIsSidebarOpen} />

        <main className="p-6">
          <div className="min-h-[calc(100vh-64px)] bg-base-100/80 rounded-xl p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;