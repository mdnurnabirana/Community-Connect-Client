import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Container from "./Container";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "./Loading";
import {
  FiMenu,
  FiX,
  FiUser,
  FiHome,
  FiLogOut,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import Logo from "./Logo";
import { useTheme } from "../providers/ThemeContext";

const navMenus = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Clubs", link: "/clubs" },
  { id: 3, name: "Events", link: "/events" },
  { id: 4, name: "About", link: "/about" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, loading, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        closeMenus();
      })
      .catch((err) => console.error(err));
  };

  return (
    <header className="sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 bg-base-100 rounded-full shadow-xl border border-base-200 relative">
          <Link to="/" className="lg:hidden">
            <Logo height={50} width={50} showText={false} />
          </Link>

          <Link to="/" className="hidden lg:block">
            <Logo height={50} width={50} showText={true} />
          </Link>

          <nav className="hidden lg:flex ml-10">
            <ul className="flex gap-10">
              {navMenus.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `text-lg font-medium relative group transition-colors ${
                        isActive
                          ? "text-primary"
                          : "text-neutral hover:text-primary"
                      }`
                    }
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-primary text-primary hover:bg-base-200 transition text-xl"
            >
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>

            {loading && <Loading height={32} width={32} />}

            {!loading && !user && (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary/70 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-full bg-secondary text-white font-medium hover:bg-secondary/70 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {!loading && user && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="w-11 h-11 rounded-full border-2 border-primary overflow-hidden focus:outline-none ring-4 ring-transparent hover:ring-primary/20 transition"
                >
                  <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt={user?.displayName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>

                {profileOpen && (
                  <div className="text-neutral absolute right-0 mt-3 w-72 bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden z-999 animate-fadeIn">
                    <div className="p-5 border-b border-base-200">
                      <p className="font-bold text-lg truncate">
                        {user.displayName}
                      </p>
                      <p className="text-sm text-neutral truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-3">
                      <Link
                        to="/profile"
                        onClick={closeMenus}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-base-200 transition"
                      >
                        <FiUser className="text-xl" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/dashboard"
                        onClick={closeMenus}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-base-200 transition"
                      >
                        <FiHome className="text-xl" />
                        <span>Dashboard</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="bg-secondary flex items-center gap-4 w-full px-5 py-3 text-white hover:bg-secondary/80 transition"
                      >
                        <FiLogOut className="text-xl" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              className="lg:hidden text-3xl text-neutral"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden animate-slideDown z-999">
            <nav className="py-4">
              <ul>
                {navMenus.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.link}
                      onClick={closeMenus}
                      className={({ isActive }) =>
                        `block px-8 py-4 text-lg font-medium transition ${
                          isActive
                            ? "bg-base-200 text-primary"
                            : "text-neutral hover:bg-base-200"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {!user && !loading && (
              <div className="px-6 pb-6 flex flex-col gap-4">
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="block text-center py-3.5 rounded-full bg-base-200 text-primary font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenus}
                  className="block text-center py-3.5 rounded-full bg-primary text-white font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;