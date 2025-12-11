import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";

const MyEvent = () => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["my-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-registered-events");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 mt-10">🎉 My Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center mt-12">
          You haven't registered for any events yet.
        </p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border border-base-300 rounded-lg">
            <thead className="bg-base-200">
              <tr>
                <th className="p-3 text-left border-b">#</th>
                <th className="p-3 text-left border-b">Event Title</th>
                <th className="p-3 text-left border-b">Club</th>
                <th className="p-3 text-left border-b">Date</th>
                <th className="p-3 text-left border-b">Status</th>
              </tr>
            </thead>

            <tbody>
              {events.map((ev, index) => (
                <tr
                  key={ev.registrationId}
                  className={index % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                >
                  <td className="p-3 border-b">{index + 1}</td>

                  {/* Event Title */}
                  <td className="p-3 border-b font-medium">
                    {ev.eventTitle || "N/A"}
                  </td>

                  {/* Club Name */}
                  <td className="p-3 border-b">{ev.clubName || "N/A"}</td>

                  {/* Event Date */}
                  <td className="p-3 border-b text-sm">
                    {ev.eventDate
                      ? new Date(ev.eventDate).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Status */}
                  <td className="p-3 border-b">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm ${
                        ev.status === "registered"
                          ? "bg-green-200 text-green-700"
                          : ev.status === "pendingPayment"
                          ? "bg-yellow-200 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default MyEvent;