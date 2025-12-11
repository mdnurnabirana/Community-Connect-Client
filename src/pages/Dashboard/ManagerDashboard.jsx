import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import { FiUsers, FiCalendar, FiDollarSign, FiHome } from "react-icons/fi";

const ManagerDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["manager-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/overview");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen"><Loading /></div>;
  }

  const { totalClubs = 0, totalMembers = 0, totalEvents = 0, totalRevenue = 0 } = stats;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manager Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-200 p-6 rounded-xl flex items-center gap-4">
          <FiHome className="text-4xl text-primary" />
          <div>
            <p className="text-lg text-gray-600">Clubs Managed</p>
            <p className="text-3xl font-bold">{totalClubs}</p>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-xl flex items-center gap-4">
          <FiUsers className="text-4xl text-accent" />
          <div>
            <p className="text-lg text-gray-600">Total Members</p>
            <p className="text-3xl font-bold">{totalMembers}</p>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-xl flex items-center gap-4">
          <FiCalendar className="text-4xl text-secondary" />
          <div>
            <p className="text-lg text-gray-600">Events Created</p>
            <p className="text-3xl font-bold">{totalEvents}</p>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-xl flex items-center gap-4">
          <FiDollarSign className="text-4xl text-green-600" />
          <div>
            <p className="text-lg text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold">${totalRevenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;