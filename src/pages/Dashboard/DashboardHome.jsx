import useRole from "../../hooks/useRole";
import Loading from "../../shared/Loading";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import MemberDashboard from "./MemberDashboard";

const DashboardHome = () => {
  const [role, isLoading] = useRole();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loading /></div>;
  }

  if (role === "admin") return <AdminDashboard />;
  if (role === "manager") return <ManagerDashboard />;
  return <MemberDashboard />;
};

export default DashboardHome;