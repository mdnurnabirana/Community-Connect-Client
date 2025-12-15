import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const EventDetails = () => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    data: event,
    isLoading: isEventLoading,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: ["event-details", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/event/${id}`
      );
      return res.data;
    },
  });
  const {
    data: registration,
    isLoading: isRegLoading,
    refetch: refetchRegistration,
  } = useQuery({
    queryKey: ["event-registration", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}/registrationcheck`);
      return res.data;
    },
    enabled: !!user,
  });
  const { data: membership, isLoading: isMembershipLoading } = useQuery({
    queryKey: ["membership-check", event?.clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/memberships/club/${event.clubId}/check`
      );
      return res.data;
    },
    enabled: !!user && role === "member" && !!event?.clubId,
  });

  useEffect(() => {
    if (!user && !loading) {
      toast.error("Please login to continue");
    }
  }, [user, loading]);

  const handleRegister = async () => {
    try {
      const res = await axiosSecure.post(`/events/${id}/register`);
      if (res.data.free) {
        toast.success(res.data.message || "Successfully registered!");
        refetchEvent();
        refetchRegistration();
        return;
      }
      if (res.data.checkoutUrl) window.location.href = res.data.checkoutUrl;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  if (
    loading ||
    isRoleLoading ||
    isEventLoading ||
    isRegLoading ||
    isMembershipLoading
  )
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );

  if (!event)
    return (
      <Container>
        <p className="text-center text-gray-500 mt-20">Event not found</p>
      </Container>
    );

  let statusMessage = null;
  let buttonText = "Register for Event";
  let buttonDisabled = false;

  if (!user) {
    statusMessage = "Please login to continue";
  } else if (role !== "member") {
    statusMessage = "User role must be a 'Member'";
  } else if (!membership?.hasActive) {
    statusMessage = "User must have membership with the club";
  } else {
    if (registration?.status === "registered") {
      buttonText = "Already Registered";
      buttonDisabled = true;
    } else if (registration?.status === "pendingPayment") {
      buttonText = "Complete Your Payment";
    }
  }

  return (
    <Container>
      <title>CC - Event Details</title>
      <motion.div
        className="max-w-3xl mx-4 sm:mx-auto my-12 bg-base-100 border border-base-300 rounded-2xl p-5 shadow-sm"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <div className="space-y-2 text-gray-600 mb-6">
          <p>📍 Location: {event.location}</p>
          <p>📅 Date: {new Date(event.eventDate).toLocaleString()}</p>
          {event.isPaid ? (
            <p className="text-error font-semibold">
              💰 Fee: ${event.eventFee}
            </p>
          ) : (
            <p className="text-green-600 font-semibold">🎉 Free Event</p>
          )}
          {event.maxAttendees && <p>👥 Max attendees: {event.maxAttendees}</p>}
        </div>
        <p className="text-gray-700 leading-relaxed mb-8">
          {event.description}
        </p>
        {statusMessage ? (
          <p className="text-red-500 font-semibold text-center">
            {statusMessage}
          </p>
        ) : (
          <button
            onClick={handleRegister}
            disabled={buttonDisabled}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              buttonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/80"
            }`}
          >
            {buttonText}
          </button>
        )}
      </motion.div>
    </Container>
  );
};
export default EventDetails;