import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaCalendarAlt, FaRegClock } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";

const MemberDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["member-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/member/overview");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }

  const {
    totalClubsJoined = 0,
    totalEventsRegistered = 0,
    upcomingEvents = [],
  } = overview;

  return (
    <div className="space-y-8">
      <title>User - Dashboard</title>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          Welcome back 👋
        </h1>
        <p className="text-sm text-neutral mt-1">
          Here’s a quick overview of activities
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<FaUsers />}
          label="Clubs Joined"
          value={totalClubsJoined}
          bg="bg-primary/10"
          iconColor="text-primary"
        />

        <StatCard
          icon={<FaCalendarAlt />}
          label="Events Registered"
          value={totalEventsRegistered}
          bg="bg-secondary/10"
          iconColor="text-secondary"
        />

        <StatCard
          icon={<FaRegClock />}
          label="Upcoming Events"
          value={upcomingEvents.length}
          bg="bg-accent/10"
          iconColor="text-accent"
        />
      </div>

      <div className="bg-base-100 rounded-2xl border border-base-300 p-5 md:p-6 shadow-sm text-neutral">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-10 text-neutral">
            No upcoming events at the moment
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-base-300 bg-base-200 hover:shadow transition"
              >
                <h3 className="font-semibold text-lg text-neutral">
                  {event.title}
                </h3>

                <p className="text-sm text-neutral mt-1">
                  {event.clubName} • {event.location}
                </p>

                <p className="text-sm mt-3 text-neutral">
                  {new Date(event.eventDate).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, bg, iconColor }) => {
  return (
    <div
      className={`rounded-2xl p-5 border border-base-300 bg-base-100 shadow-sm hover:shadow transition`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl ${bg} ${iconColor} text-xl`}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm text-neutral">{label}</p>
          <p className="text-3xl font-bold text-neutral">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;