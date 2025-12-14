import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";
import { Link } from "react-router";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const Event = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events", search, category],
    queryFn: async () => {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-events`,
        { params }
      );
      return res.data;
    },
  });

  const handleSearch = () => refetch();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <title>CC - Event</title>
      <div className="my-12">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral text-center mb-3">
          Explore Upcoming Events
        </h1>
        <p className="text-neutral/80 text-center mb-10 text-sm sm:text-base">
          Discover exciting activities, workshops, seminars, and gatherings
          happening around you.
        </p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 p-4 lg:p-0">
          {/* Search Bar */}
          <div className="flex items-center w-full sm:w-auto bg-base-100 border border-base-300 rounded-lg shadow-sm overflow-hidden">
            <FiSearch className="mx-3 text-neutral/60" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full sm:w-64 md:w-80 px-2 py-3 focus:outline-none text-neutral"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Category Filter */}
          <div className="relative w-full sm:w-60">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                refetch();
              }}
              className="w-full px-4 py-3 border border-base-300 rounded-lg bg-base-100 text-neutral appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Categories</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Sports">Sports</option>
              <option value="Music">Music</option>
              <option value="Arts">Arts</option>
              <option value="Tech">Tech</option>
            </select>

            <FiChevronDown
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral/60 pointer-events-none"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 lg:p-0">
          {events.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No events available at the moment.
            </p>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-base-100 border border-base-300 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col"
              >
                {/* TITLE */}
                <h3 className="text-xl font-bold text-neutral mb-2">
                  {event.title}
                </h3>

                {/* DESC */}
                <p className="text-sm text-neutral/70 mb-3 line-clamp-2">
                  {event.description}
                </p>

                {/* EVENT INFO */}
                <div className="text-sm text-neutral/80 space-y-1 mb-4">
                  <p>📍 {event.location}</p>
                  <p>📅 {new Date(event.eventDate).toLocaleDateString()}</p>

                  {event.isPaid ? (
                    <p className="text-error font-medium">
                      💰 Fee: ${event.eventFee}
                    </p>
                  ) : (
                    <p className="text-success font-medium">🎉 Free Event</p>
                  )}
                </div>

                {/* BUTTON */}
                <Link
                  to={`/events/${event._id}`}
                  className="mt-auto text-center bg-primary text-white py-2 rounded-lg hover:bg-primary/80 transition"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default Event;