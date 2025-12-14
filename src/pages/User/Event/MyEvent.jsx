import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";

const MyEvent = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["my-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-registered-events");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const filteredEvents = events.filter(
    (ev) =>
      ev.eventTitle?.toLowerCase().includes(search.toLowerCase()) ||
      ev.clubName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <title>CC - My Event</title>
      <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-5 md:p-7 mt-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral">
            My Events
          </h1>

          <input
            type="text"
            placeholder="Search events or clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            You haven&apos;t registered for any events yet.
          </p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
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
                  {filteredEvents.map((ev, index) => (
                    <tr
                      key={ev.registrationId}
                      className={
                        index % 2 === 0 ? "bg-base-100" : "bg-base-200"
                      }
                    >
                      <td className="p-3 border-b">{index + 1}</td>
                      <td className="p-3 border-b font-medium">
                        {ev.eventTitle || "N/A"}
                      </td>
                      <td className="p-3 border-b">{ev.clubName || "N/A"}</td>
                      <td className="p-3 border-b text-sm">
                        {ev.eventDate
                          ? new Date(ev.eventDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="p-3 border-b">
                        <StatusBadge status={ev.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {filteredEvents.map((ev) => (
                <div
                  key={ev.registrationId}
                  className="bg-base-200 border border-base-300 rounded-xl p-4 shadow-sm"
                >
                  <h3 className="font-semibold text-lg mb-1">
                    {ev.eventTitle || "N/A"}
                  </h3>

                  <p className="text-sm text-gray-600 mb-1">
                    Club: {ev.clubName || "N/A"}
                  </p>

                  <p className="text-sm text-gray-600 mb-3">
                    Date:{" "}
                    {ev.eventDate
                      ? new Date(ev.eventDate).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <StatusBadge status={ev.status} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
        status === "registered"
          ? "bg-green-100 text-green-700"
          : status === "pendingPayment"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default MyEvent;