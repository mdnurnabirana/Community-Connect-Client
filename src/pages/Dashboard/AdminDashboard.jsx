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
import { motion } from "motion/react";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => (await axiosSecure.get("/admin/overview")).data,
  });

  const { data: usersData = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users-over-time"],
    queryFn: async () =>
      (await axiosSecure.get("/admin/users-over-time")).data,
  });

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

  const {
    totalUsers = 0,
    clubs = {},
    totalMemberships = 0,
    totalEvents = 0,
    totalRevenue = 0,
  } = stats;

  const statCards = [
    {
      icon: FiUsers,
      label: "Total Users",
      value: totalUsers,
      color: "text-primary",
    },
    {
      icon: FiHome,
      label: "Total Clubs",
      value: clubs.total || 0,
      color: "text-accent",
      extra: (
        <div className="text-sm mt-2">
          <span className="text-yellow-600">Pending: {clubs.pending || 0}</span>{" "}
          |{" "}
          <span className="text-green-600">Approved: {clubs.approved || 0}</span>{" "}
          | <span className="text-red-600">Rejected: {clubs.rejected || 0}</span>
        </div>
      ),
    },
    {
      icon: FiUserCheck,
      label: "Active Memberships",
      value: totalMemberships,
      color: "text-secondary",
    },
    {
      icon: FiCalendar,
      label: "Total Events",
      value: totalEvents,
      color: "text-blue-600",
    },
    {
      icon: FiDollarSign,
      label: "Total Revenue",
      value: `$${totalRevenue}`,
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      <title>Admin - Dashboard</title>
      <h1 className="text-neutral text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              className="bg-base-100 p-6 rounded-xl text-center shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <Icon className={`mx-auto text-5xl ${card.color} mb-4`} />
              <p className="text-lg text-neutral">{card.label}</p>
              <p className="text-3xl font-bold text-neutral">{card.value}</p>
              {card.extra && card.extra}
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-base-100 p-5 rounded-xl shadow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-neutral text-xl font-semibold mb-4">User Growth</h2>
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
        </motion.div>

        <motion.div
          className="bg-base-100 p-5 rounded-xl shadow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-neutral text-xl font-semibold mb-4">Revenue Generation</h2>
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
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;