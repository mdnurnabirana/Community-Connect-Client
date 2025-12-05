import React from "react";
import Container from "./Container";
import { Link } from "react-router";

const navMenus = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Clubs", link: "/clubs" },
  { id: 3, name: "Events", link: "/events" },
  { id: 4, name: "About", link: "/about" },
  { id: 5, name: "Contact", link: "/contact" },
];

const Navbar = () => {
  return (
    <header className="mt-5">
      <Container>
        <div className="flex justify-between items-center px-10 py-5 bg-base-100 rounded-full shadow-xl border border-base-200 backdrop-blur-md">
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            ClubSphere
          </h1>

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
          <div className="flex justify-between gap-5 text-md font-medium">
            <Link to="/login" className="bg-base-200 px-4 py-2 rounded-xl text-primary shadow-lg">Login</Link>
            <Link to="/register" className="bg-base-300 px-4 py-2 rounded-xl text-primary shadow-lg">Sign Up</Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;