import { NavLink } from "react-router";
import { FaHome, FaUserCog, FaChartBar } from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Analytics", path: "/dashboard/analytics", icon: <FaChartBar /> },
  { name: "Settings", path: "/dashboard/settings", icon: <FaUserCog /> },
];

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen text-white bg-neutral
      transition-all duration-300
      ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b border-base-300">
        {isOpen ? "My Dashboard" : "MD"}
      </div>

      <ul className="mt-4 space-y-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition
                hover:bg-base-300/10
                ${isActive ? "bg-primary text-white" : ""}`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;