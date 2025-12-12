import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FiUsers,
  FiHome,
  FiUserCheck,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // Overview stats
  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => (await axiosSecure.get("/admin/overview")).data,
  });

  // Users over time
  const { data: usersData = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users-over-time"],
    queryFn: async () => (await axiosSecure.get("/admin/users-over-time")).data,
  });

  // Revenue over time
  const { data: revenueData = [], isLoading: revenueLoading } = useQuery({
    queryKey: ["revenue-over-time"],
    queryFn: async () =>
      (await axiosSecure.get("/admin/revenue-over-time")).data,
  });

  const loading = statsLoading || usersLoading || revenueLoading;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );

  // Safe destructuring
  const {
    totalUsers = 0,
    clubs = {},
    totalMemberships = 0,
    totalEvents = 0,
    totalRevenue = 0,
  } = stats;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <div className="bg-base-100 p-6 rounded-xl text-center shadow">
          <FiUsers className="mx-auto text-5xl text-primary mb-4" />
          <p className="text-lg text-gray-600">Total Users</p>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-base-100 p-6 rounded-xl text-center shadow">
          <FiHome className="mx-auto text-5xl text-accent mb-4" />
          <p className="text-lg text-gray-600">Total Clubs</p>
          <p className="text-3xl font-bold">{clubs.total || 0}</p>
          <div className="text-sm mt-2">
            <span className="text-yellow-600">
              Pending: {clubs.pending || 0}
            </span>{" "}
            |{" "}
            <span className="text-green-600">
              Approved: {clubs.approved || 0}
            </span>{" "}
            |{" "}
            <span className="text-red-600">
              Rejected: {clubs.rejected || 0}
            </span>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-xl text-center shadow">
          <FiUserCheck className="mx-auto text-5xl text-secondary mb-4" />
          <p className="text-lg text-gray-600">Active Memberships</p>
          <p className="text-3xl font-bold">{totalMemberships}</p>
        </div>

        <div className="bg-base-100 p-6 rounded-xl text-center shadow">
          <FiCalendar className="mx-auto text-5xl text-blue-600 mb-4" />
          <p className="text-lg text-gray-600">Total Events</p>
          <p className="text-3xl font-bold">{totalEvents}</p>
        </div>

        <div className="bg-base-100 p-6 rounded-xl text-center shadow">
          <FiDollarSign className="mx-auto text-5xl text-green-600 mb-4" />
          <p className="text-lg text-gray-600">Total Revenue</p>
          <p className="text-3xl font-bold">${totalRevenue}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-base-100 p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={
                Array.isArray(usersData)
                  ? usersData.map((u) => ({ month: u._id, count: u.count }))
                  : []
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Generation */}
        <div className="bg-base-100 p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Generation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={
                Array.isArray(revenueData)
                  ? revenueData.map((r) => ({ month: r._id, total: r.total }))
                  : []
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;