import React from "react";
import { Link } from "react-router";
import { FaGithub, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-neutral py-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start max-w-xs text-center md:text-left">
            <Logo height={60} width={60} />
            <p className="text-neutral/70 mt-3 text-sm md:text-base">
              Connect, learn, and grow with communities that match your
              interests.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-10 md:gap-16 text-center sm:text-left">
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Company
              </h3>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                to="#"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="flex flex-col gap-2 items-center sm:items-start">
              <h3 className="font-semibold mb-2 text-sm md:text-base">
                Resources
              </h3>
              <Link
                to="/clubs"
                className="hover:text-primary transition-colors"
              >
                Clubs
              </Link>
              <Link
                to="/events"
                className="hover:text-primary transition-colors"
              >
                Events
              </Link>
              <Link to="#" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-3 text-sm md:text-base">
              Follow Us
            </h3>
            <div className="flex space-x-5">
              <a
                href="https://github.com/mdnurnabirana"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-all duration-200"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.facebook.com/mdNurnabiRana00/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-all duration-200"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/md-nurnabi-rana-/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                href="https://twitter.com/mdnurnabi_rana"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-all duration-200"
                aria-label="X"
              >
                <RiTwitterXFill size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral/20 mt-12 pt-6 text-center text-sm md:text-base text-neutral/70">
          &copy; {new Date().getFullYear()} Community Connect. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;