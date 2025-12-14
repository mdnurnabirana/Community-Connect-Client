import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";

const ClubDetails = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: club = {}, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => (await axiosSecure.get(`/club/${id}`)).data,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const handleJoinClub = async () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    if (role !== "member") {
      toast.error("Only users can join clubs");
      return;
    }

    try {
      const { data } = await axiosSecure.post(`/clubs/${id}/join`);

      if (data.free) {
        toast.success("Joined successfully!");
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to join club");
    }
  };

  return (
    <Container>
      <title>CC - Club Detail</title>
      <div className="py-12">
        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-sm">
          <img
            src={club.bannerImage}
            alt={club.clubName}
            className="w-full h-[420px] object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto mt-10 px-4 lg:px-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">
            {club.clubName}
          </h1>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-8 text-[17px]">
            {club.description}
          </p>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5 mb-10 text-[15px]">
            <p>
              <span className="font-semibold text-gray-700">Category:</span>{" "}
              {club.category}
            </p>

            <p>
              <span className="font-semibold text-gray-700">Location:</span>{" "}
              {club.location}
            </p>

            <p>
              <span className="font-semibold text-gray-700">Manager:</span>{" "}
              {club.managerEmail}
            </p>

            <p>
              <span className="font-semibold text-gray-700">Created At:</span>{" "}
              {new Date(club.createdAt).toLocaleDateString()}
            </p>

            <p>
              <span className="font-semibold text-gray-700">
                Membership Fee:
              </span>{" "}
              {club.membershipFee === 0 ? "Free" : `$ ${club.membershipFee}`}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={handleJoinClub}
              className="w-full sm:w-auto px-10 py-3 bg-primary text-white rounded-lg text-lg font-semibold shadow-md disabled:opacity-50"
            >
              {club.membershipFee === 0 ? "Join Club" : "Join & Pay"}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ClubDetails;