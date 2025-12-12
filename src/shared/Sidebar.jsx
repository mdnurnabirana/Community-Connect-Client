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
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-neutral text-white shadow-xl z-40
          transition-all duration-300
          ${isOpen ? "w-64" : "w-0 lg:w-20"}
        `}
      >
        {/* Top section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-base-300">
          <Link to="/" className="font-bold text-xl truncate">
            {isOpen ? "My Dashboard" : "MD"}
          </Link>

          <button
            className="lg:hidden text-xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FiX />
          </button>
        </div>

        {/* Nav links */}
        <ul className="mt-4 space-y-2 px-2">
          {isRoleLoading ? (
            <Loading />
          ) : (
            navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-lg transition-all
                      hover:bg-base-300/20
                      ${isActive ? "bg-base-300/30 text-primary" : ""}
                    `
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
    </>
  );
};

export default Sidebar;