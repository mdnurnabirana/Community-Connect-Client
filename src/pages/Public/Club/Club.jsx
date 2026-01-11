import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";
import { Link } from "react-router";
import axios from "axios";
import { motion } from "motion/react";

const Club = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");

  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approved-clubs", search, category, sort],
    queryFn: async () => {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (sort) params.sort = sort;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubs/approved`,
        {
          params,
        }
      );
      return res.data;
    },
  });

  const handleSearch = () => refetch();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );

  return (
    <Container>
      <title>CC - All Clubs</title>
      <div className="my-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral text-center mb-3">
          Explore Our Clubs
        </h1>
        <p className="text-neutral/95 text-center mb-10 text-sm sm:text-base">
          Join communities that inspire learning, fun, and networking.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 p-5 lg:p-0">
          <div className="flex items-center w-full sm:w-auto bg-base-100 border border-base-300 rounded-lg shadow-sm overflow-hidden">
            <FiSearch className="mx-3 text-neutral/60" size={20} />
            <input
              type="text"
              placeholder="Search clubs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full md:w-40 lg:w-80 px-2 py-3 focus:outline-none text-neutral"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </div>

          <div className="flex justify-between gap-4">
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
                <option value="Sports">Sports</option>
                <option value="Arts">Arts</option>
                <option value="Music">Music</option>
                <option value="Tech">Tech</option>
              </select>

              <FiChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral/60 pointer-events-none"
              />
            </div>

            <div className="relative w-full sm:w-60">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  refetch();
                }}
                className="w-full px-4 py-3 border border-base-300 rounded-lg bg-base-100 text-neutral appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highestFee">Highest Fee</option>
                <option value="lowestFee">Lowest Fee</option>
              </select>

              <FiChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral/60 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 lg:p-0">
          {clubs.length === 0 ? (
            <p className="text-center text-neutral col-span-full">
              No clubs available at the moment.
            </p>
          ) : (
            clubs.map((club, index) => (
              <motion.div
                key={club._id}
                className="group bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={club.bannerImage}
                    alt={club.clubName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-neutral mb-2">
                    {club.clubName}
                  </h3>

                  <p className="text-neutral/80 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                    {club.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-5">
                    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                      {club.category}
                    </span>

                    <span className="px-3 py-1 text-sm font-semibold text-accent bg-accent/10 rounded-full">
                      {club.membershipFee === 0
                        ? "Free"
                        : `$${club.membershipFee}`}
                    </span>
                  </div>

                  <Link
                    to={`/club/${club._id}`}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white text-center rounded-xl font-semibold transition-colors shadow"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default Club;