import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Container from "../../../shared/Container";
import { Link } from "react-router";

const Club = () => {
  const axiosSecure = useAxiosSecure();
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["approved-clubs"],
    queryFn: async () => (await axiosSecure.get("/clubs/approved")).data,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <div className="my-12 text-center">
        <h1 className="text-3xl font-extrabold text-neutral mb-2">
          Explore Our Clubs
        </h1>
        <p className="text-neutral/90">
          Join communities that inspire learning, fun, and networking.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {clubs.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No clubs available at the moment.
          </p>
        ) : (
          clubs.map((club) => (
            <div className="group relative bg-base-100 rounded-xl shadow-xl overflow-hidden h-full flex flex-col">
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {club.clubName}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                  {club.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                    {club.category}
                  </span>
                  <span className="px-4 py-1.5 text-sm font-semibold text-amber-700 bg-amber-100 rounded-full">
                    {club.membershipFee === 0
                      ? "Free"
                      : `$${club.membershipFee}`}
                  </span>
                </div>

                {/* Button */}
                <Link to={`/club/${club._id}`} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-colors shadow-md text-center">
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default Club;