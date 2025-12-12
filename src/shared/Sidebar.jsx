import { Link, NavLink } from "react-router";
import {
  FaHome,
  FaUserCog,
  FaMoneyBill,
  FaUsers,
  FaCalendar,
  FaPlusCircle,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import Loading from "./Loading";
import { FiX } from "react-icons/fi";
import Logo from "./Logo";

const userNav = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome />, end: true },
  {
    name: "Joined Club",
    path: "/dashboard/member/joined-club",
    icon: <FaUsers />,
  },
  { name: "My Events", path: "/dashboard/my-events", icon: <FaCalendar /> },
  {
    name: "My Payments",
    path: "/dashboard/my-payments",
    icon: <FaMoneyBill />,
  },
];

const managerNav = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome />, end: true },
  {
    name: "Create Club",
    path: "/dashboard/create-club",
    icon: <FaPlusCircle />,
  },
  { name: "Manage Club", path: "/dashboard/manage-club", icon: <FaUsers /> },
  {
    name: "Create Event",
    path: "/dashboard/create-event",
    icon: <FaPlusCircle />,
  },
  {
    name: "Manage Event",
    path: "/dashboard/manage-event",
    icon: <FaCalendar />,
  },
];

const adminNav = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome />, end: true },
  { name: "Manage User", path: "/dashboard/manage-user", icon: <FaUserCog /> },
  {
    name: "Manage Club",
    path: "/dashboard/admin/manage-club",
    icon: <FaUsers />,
  },
  {
    name: "All Payments",
    path: "/dashboard/admin/payments",
    icon: <FaMoneyBill />,
  },
];

const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  const [role, isRoleLoading] = useRole();

  const navItems =
    role === "admin" ? adminNav : role === "manager" ? managerNav : userNav;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral text-white shadow-xl transform transition-transform duration-300 sm:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-base-300">
          <Link
            to="/"
            className="font-bold text-lg truncate"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Logo height={40} width={40} />
          </Link>

          <button className="text-xl" onClick={() => setIsSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        <nav className="mt-3 px-2">
          {isRoleLoading ? (
            <Loading />
          ) : (
            navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                end={item.end}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover:bg-base-300/20 ${
                    isActive ? "bg-base-300/30 text-primary" : ""
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))
          )}
        </nav>
      </aside>

      <aside
        className={`hidden sm:flex sm:flex-col sm:fixed sm:inset-y-0 sm:left-0 sm:z-40 bg-neutral text-white transition-all duration-300
          ${isOpen ? "sm:w-64" : "sm:w-20"}
        `}
      >
        <div className="h-16 flex items-center px-3 border-b border-base-300">
          <Link to="/" className="font-bold text-lg truncate">
            {isOpen ? (
              <Logo height={48} width={48} />
            ) : (
              <Logo height={36} width={36} showText={false} />
            )}
          </Link>
        </div>

        <nav className="mt-4 px-2 flex-1 overflow-auto">
          {isRoleLoading ? (
            <Loading />
          ) : (
            navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-3 py-3 rounded-lg transition-all hover:bg-base-300/20 ${
                    isActive ? "bg-base-300/30 text-primary" : ""
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            ))
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;