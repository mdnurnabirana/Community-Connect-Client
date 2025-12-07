import { FaBars, FaUserCircle } from "react-icons/fa";

const Topbar = ({ setIsSidebarOpen }) => {
  return (
    <header className="h-16 bg-base-100 border-b border-base-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="text-xl text-neutral"
      >
        <FaBars />
      </button>

      <div className="flex items-center gap-2">
        <span className="font-medium text-neutral">Admin</span>
        <FaUserCircle className="text-2xl text-primary" />
      </div>
    </header>
  );
};

export default Topbar;