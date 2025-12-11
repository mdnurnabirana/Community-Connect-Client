import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import { FiUsers, FiHome, FiUserCheck, FiCalendar, FiDollarSign } from "react-icons/fi";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/overview");
      return res.data;
    },
  });

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><Loading /></div>;

  const { totalUsers = 0, clubs = {}, totalMemberships = 0, totalEvents = 0, totalRevenue = 0 } = stats;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Total Users */}
        <div className="bg-base-100 p-8 rounded-xl text-center shadow">
          <FiUsers className="mx-auto text-5xl text-primary mb-4" />
          <p className="text-lg text-gray-600">Total Users</p>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        {/* Clubs */}
        <div className="bg-base-100 p-8 rounded-xl text-center shadow">
          <FiHome className="mx-auto text-5xl text-accent mb-4" />
          <p className="text-lg text-gray-600">Total Clubs</p>
          <p className="text-3xl font-bold">{clubs.total || 0}</p>
          <div className="text-sm mt-2">
            <span className="text-yellow-600">Pending: {clubs.pending || 0}</span> | 
            <span className="text-green-600"> Approved: {clubs.approved || 0}</span> | 
            <span className="text-red-600"> Rejected: {clubs.rejected || 0}</span>
          </div>
        </div>

        {/* Memberships */}
        <div className="bg-base-100 p-8 rounded-xl text-center shadow">
          <FiUserCheck className="mx-auto text-5xl text-secondary mb-4" />
          <p className="text-lg text-gray-600">Active Memberships</p>
          <p className="text-3xl font-bold">{totalMemberships}</p>
        </div>

        {/* Events */}
        <div className="bg-base-100 p-8 rounded-xl text-center shadow">
          <FiCalendar className="mx-auto text-5xl text-blue-600 mb-4" />
          <p className="text-lg text-gray-600">Total Events</p>
          <p className="text-3xl font-bold">{totalEvents}</p>
        </div>

        {/* Revenue */}
        <div className="bg-base-100 p-8 rounded-xl text-center shadow">
          <FiDollarSign className="mx-auto text-5xl text-green-600 mb-4" />
          <p className="text-lg text-gray-600">Total Revenue</p>
          <p className="text-3xl font-bold">${totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;