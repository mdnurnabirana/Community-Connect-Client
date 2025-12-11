import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
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
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (memberships.length == 0) {
    return (
      <Container>
        <div className="mt-12 text-center text-gray-500">
          You have not joined any clubs yet.
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center text-neutral text-3xl">My Joined Clubs</h1>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {memberships.map((m) => (
          <div
            key={m._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col min-h-[400px]"
          >
            {/* Banner */}
            <div className="h-44 w-full overflow-hidden">
              <img
                src={m.bannerImage}
                alt={m.clubName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold mb-2">{m.clubName}</h3>
              <p className="text-gray-600 mb-2">Location: {m.location}</p>
              <p className="text-sm font-medium mb-4">
                Status:{" "}
                <span className="text-green-600 font-semibold">{m.status}</span>
              </p>
              {m.expiresAt && (
                <p className="text-sm text-gray-500 mb-4">
                  Expires: {new Date(m.expiresAt).toLocaleDateString()}
                </p>
              )}

              <Link
                to={`/club/${m.clubId}`}
                className="mt-auto px-4 py-2 bg-blue-500 text-white rounded text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default JoinedClub;