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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FiUsers,
  FiHome,
  FiUserCheck,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";
import { motion } from "motion/react";

const COLORS = ["#0d9488", "#f43f5e", "#fbbf24"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => (await axiosSecure.get("/admin/overview")).data,
  });

  const { data: usersData = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users-over-time"],
    queryFn: async () => (await axiosSecure.get("/admin/users-over-time")).data,
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
      hoverContent: (
        <div className="space-y-1 text-sm">
          <p className="text-yellow-600">Pending: {clubs.pending || 0}</p>
          <p className="text-green-600">Approved: {clubs.approved || 0}</p>
          <p className="text-red-600">Rejected: {clubs.rejected || 0}</p>
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

  const clubPieData = [
    { name: "Approved", value: clubs.approved || 0 },
    { name: "Pending", value: clubs.pending || 0 },
    { name: "Rejected", value: clubs.rejected || 0 },
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
              className="relative group bg-base-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Icon className={`mx-auto text-5xl ${card.color} mb-4`} />
              <p className="text-lg text-neutral">{card.label}</p>
              <p className="text-3xl font-bold text-neutral">{card.value}</p>

              {card.hoverContent && (
                <div className="absolute left-1/2 top-full mt-3 w-44 -translate-x-1/2 bg-base-200 border border-base-300 rounded-lg p-3 shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition pointer-events-none z-20">
                  {card.hoverContent}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-base-100 p-5 rounded-xl shadow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-neutral text-xl font-semibold mb-4">
            Club Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={clubPieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                {clubPieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-base-100 p-5 rounded-xl shadow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-neutral text-xl font-semibold mb-4">
            Users Over Time
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={usersData.map((u) => ({
                month: u._id,
                users: u.count,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#0d9488"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;