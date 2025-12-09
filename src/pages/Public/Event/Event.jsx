import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";
import { Link } from "react-router";

const Event = () => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-events`);
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

  if (!events.length) {
    return (
      <Container>
        <p className="text-center text-gray-500 mt-16 text-lg">
          No events available
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold text-primary mt-10 mb-8 text-center">
        All Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white border border-base-300 rounded-xl p-5 shadow-sm flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
              {event.description}
            </p>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>📍 {event.location}</p>
              <p>📅 {new Date(event.eventDate).toLocaleDateString()}</p>

              {event.isPaid ? (
                <p className="text-error font-medium">
                  💰 Fee: ${event.eventFee}
                </p>
              ) : (
                <p className="text-green-600 font-medium">🎉 Free Event</p>
              )}
            </div>

            <Link
              to={`/events/${event._id}`}
              className="mt-auto text-center bg-primary text-white py-2 rounded-lg hover:bg-primary/80 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Event;