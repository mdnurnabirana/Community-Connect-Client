import { Link, NavLink } from "react-router";
import { FaHome, FaUserCog } from "react-icons/fa";
import useRole from "../hooks/useRole";
import Loading from "./Loading";

const userNav = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "My Club", path: "/dashboard/my-club", icon: <FaHome /> },
];

const managerNav = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Create Club", path: "/dashboard/create-club", icon: <FaHome />},
  { name: "Manage Club", path: "/dashboard/manage-club", icon: <FaHome />}
];

const adminNav = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Manage User", path: "/dashboard/manage-user", icon: <FaUserCog /> },
  { name: "Manage Club", path: "/dashboard/admin/manage-club", icon: <FaHome />}
];

const Sidebar = ({ isOpen }) => {
  const [role, isRoleLoading] = useRole();

  const navItems =
    role === "admin"
      ? adminNav
      : role === "manager"
      ? managerNav
      : userNav;

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen text-white bg-neutral
        transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b border-base-300">
        <Link to="/">{isOpen ? "My Dashboard" : "MD"}</Link>
      </div>

      <ul className="mt-4 space-y-2">
        {isRoleLoading ? (
          <Loading />
        ) : (
          navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg transition
                  hover:bg-base-300/10
                  ${isActive ? "text-white" : ""}`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;