import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../shared/Loading";

const ManagerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (isRoleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (role === "manager") return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ManagerRoute;