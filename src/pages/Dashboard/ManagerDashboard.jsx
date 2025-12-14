import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import { FiUsers, FiCalendar, FiDollarSign, FiHome } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatCard = ({
  icon,
  label,
  value,
  accentBg = "bg-primary/10",
  iconColor = "text-primary",
}) => (
  <div className="bg-base-100 p-6 rounded-xl flex items-center gap-4 shadow">
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center ${accentBg}`}
    >
      <div className={`${iconColor} text-2xl`}>{icon}</div>
    </div>
    <div>
      <p className="text-sm text-neutral/70">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const ManagerDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["manager-overview"],
    queryFn: async () => (await axiosSecure.get("/manager/overview")).data,
  });

  const { data: membersData = [], isLoading: membersLoading } = useQuery({
    queryKey: ["manager-members-over-time"],
    queryFn: async () =>
      (await axiosSecure.get("/manager/members-over-time")).data,
  });

  const { data: revenueData = [], isLoading: revenueLoading } = useQuery({
    queryKey: ["manager-revenue-over-time"],
    queryFn: async () =>
      (await axiosSecure.get("/manager/revenue-over-time")).data,
  });

  if (isLoading || membersLoading || revenueLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );

  const {
    totalClubs = 0,
    totalMembers = 0,
    totalEvents = 0,
    totalRevenue = 0,
  } = stats;

  return (
    <div className="space-y-10">
      <title>Manager - Dashboard</title>
      <h1 className="text-3xl font-bold">Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiHome />}
          label="Clubs Managed"
          value={totalClubs}
          accentBg="bg-accent/10"
          iconColor="text-accent"
        />

        <StatCard
          icon={<FiUsers />}
          label="Total Members"
          value={totalMembers}
          accentBg="bg-primary/10"
          iconColor="text-primary"
        />

        <StatCard
          icon={<FiCalendar />}
          label="Events Created"
          value={totalEvents}
          accentBg="bg-secondary/10"
          iconColor="text-secondary"
        />

        <StatCard
          icon={<FiDollarSign />}
          label="Total Revenue"
          value={`$${totalRevenue}`}
          accentBg="bg-success/10"
          iconColor="text-success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-base-100 p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Membership Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={
                Array.isArray(membersData)
                  ? membersData.map((d) => ({ month: d._id, count: d.count }))
                  : []
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#0D9488" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-base-100 p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={
                Array.isArray(revenueData)
                  ? revenueData.map((d) => ({ month: d._id, total: d.total }))
                  : []
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => `$${v}`} />
              <Line type="monotone" dataKey="total" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;