import { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";
import { FiLogOut, FiUser, FiHome } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const Topbar = ({ setIsSidebarOpen }) => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logOut();
    setOpen(false);
  };

  return (
    <header className="h-16 bg-base-100 border-b border-base-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="text-xl text-neutral"
        aria-label="Toggle sidebar"
      >
        <FaBars />
      </button>

      <div className="flex-1 px-4">
        <h1 className="text-lg font-semibold text-neutral">
          {role === "user"
            ? "User Dashboard"
            : role === "manager"
            ? "Manager Dashboard"
            : "Admin Dashboard"}
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((s) => !s)}
          className="flex items-center gap-2 sm:gap-3"
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user?.displayName || "User"}
              className="w-10 h-10 rounded-full object-cover border border-base-300"
            />
          ) : (
            <FaUserCircle className="text-3xl text-primary" />
          )}

          <span className="hidden md:block font-medium text-neutral">
            {user?.displayName || "User"}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-64 bg-base-100 shadow-xl rounded-xl border border-base-200 p-3 z-50">
            <p className="font-semibold truncate">{user?.displayName}</p>
            <p className="text-sm text-neutral truncate mb-3">{user?.email}</p>

            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200"
              onClick={() => setOpen(false)}
            >
              <FiUser /> Profile
            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200"
              onClick={() => setOpen(false)}
            >
              <FiHome /> Home
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg w-full"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;