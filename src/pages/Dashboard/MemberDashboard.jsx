import { useQuery } from "@tanstack/react-query";
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
      <div className="flex justify-center items-center min-h-screen">
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
      <h1 className="text-3xl font-bold">Welcome back!</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-200 p-6 rounded-xl text-center">
          <p className="text-lg text-gray-600">Total Clubs Joined</p>
          <p className="text-4xl font-bold mt-2">{totalClubsJoined}</p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl text-center">
          <p className="text-lg text-gray-600">Total Events Registered</p>
          <p className="text-4xl font-bold mt-2">{totalEventsRegistered}</p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl text-center">
          <p className="text-lg text-gray-600">Upcoming Events</p>
          <p className="text-4xl font-bold mt-2">{upcomingEvents.length}</p>
        </div>
      </div>

      {/* Upcoming Events List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>

        {upcomingEvents.length === 0 ? (
          <p className="text-gray-500">No upcoming events at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="bg-base-200 p-5 rounded-lg">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {event.clubName} • {event.location}
                </p>
                <p className="text-sm mt-2">
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

export default MemberDashboard;