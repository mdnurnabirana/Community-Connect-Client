import React, { useState } from "react";
import { Link } from "react-router";
import Container from "./Container";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { FiX } from "react-icons/fi";

const navMenus = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Clubs", link: "/clubs" },
  { id: 3, name: "Events", link: "/events" },
  { id: 4, name: "About", link: "/about" },
  { id: 5, name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        setProfileOpen(false);
        toast.success("Logged out successfully");
      })
      .catch((err) => console.error(err));
  };

  return (
    <header className="mt-5">
      <Container>
        <div className="flex justify-between items-center px-10 py-5 bg-base-100 rounded-full shadow-xl border border-base-200 backdrop-blur-md">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            ClubSphere
          </h1>

          {/* Nav Menu */}
          <nav>
            <ul className="flex gap-8">
              {navMenus.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className="text-neutral font-medium text-md hover:text-primary transition-colors duration-200 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5 text-md font-medium relative">
            {loading && <Loading height={30} width={30} />}

            {!loading && !user && (
              <>
                <Link
                  to="/login"
                  className="bg-base-200 px-4 py-2 rounded-xl text-primary shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-base-300 px-4 py-2 rounded-xl text-primary shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}

            {!loading && user && (
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer object-cover"
                  onClick={() => setProfileOpen(!profileOpen)}
                />

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2 z-50">
                    <div className="border-b border-base-300 pb-2">
                      <p className="font-semibold">{user.displayName}</p>
                      <p className="text-sm text-neutral">{user.email}</p>
                    </div>

                    <Link
                      to="/create-event"
                      onClick={() => setProfileOpen(false)}
                      className="px-2 py-2 rounded hover:bg-base-200 transition"
                    >
                      Create Event
                    </Link>

                    <Link
                      to="/manage-event"
                      onClick={() => setProfileOpen(false)}
                      className="px-2 py-2 rounded hover:bg-base-200 transition"
                    >
                      Manage Events
                    </Link>

                    <Link
                      to="/joined-event"
                      onClick={() => setProfileOpen(false)}
                      className="px-2 py-2 rounded hover:bg-base-200 transition"
                    >
                      Joined Events
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="px-2 py-2 rounded flex items-center gap-2 font-semibold text-red-600 hover:bg-red-500/20"
                    >
                      <FiX /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;