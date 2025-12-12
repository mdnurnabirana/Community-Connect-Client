import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";
import Container from "../../../shared/Container";
import toast from "react-hot-toast";

const EventDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: event,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["event-details", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/event/${id}`
      );
      return res.data;
    },
  });

  const handleRegister = async () => {
    try {
      const res = await axiosSecure.post(`/event-payment/${id}/register`);

      if (res.data.free) {
        toast.success(" Successfully registered!");
        refetch();
        return;
      }

      if (res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!event) {
    return (
      <Container>
        <p className="text-center text-gray-500 mt-20">Event not found</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-3xl mx-4 sm:mx-auto mt-12 bg-base-100 border border-base-300 rounded-2xl p-5 shadow-sm">
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

        <button
          onClick={handleRegister}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/80 transition"
        >
          Register for Event
        </button>
      </div>
    </Container>
  );
};

export default EventDetails;