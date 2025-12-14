import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";

const JoinedClub = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: memberships = [], isLoading } = useQuery({
    queryKey: ["my-clubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/active-memberships");
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <title>CC - Joined Club</title>
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          My Joined Clubs
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Clubs where you currently hold an active membership
        </p>
      </div>

      {/* Empty State */}
      {memberships.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          You haven’t joined any clubs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {memberships.map((m) => (
            <div
              key={m._id}
              className="group bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* Banner */}
              <div className="h-44 w-full overflow-hidden bg-base-200">
                <img
                  src={m.bannerImage || "/placeholder.jpg"}
                  alt={m.clubName}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-neutral mb-1">
                  {m.clubName}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{m.location}</span>
                </div>

                {/* Status */}
                <span className="inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full bg-success/10 text-success mb-3">
                  {m.status}
                </span>

                {m.expiresAt && (
                  <p className="text-xs text-gray-500 mb-4">
                    Expires on{" "}
                    {new Date(m.expiresAt).toLocaleDateString()}
                  </p>
                )}

                <Link
                  to={`/club/${m.clubId}`}
                  className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition"
                >
                  View Details
                  <FaArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default JoinedClub;