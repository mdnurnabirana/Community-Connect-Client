import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const EventPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await axiosSecure.post("/event-payment-success", { sessionId });
        toast.success("Event registration successful!");
      } catch (err) {
        toast.error(`${err} || Payment verification failed`);
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex flex-col items-center justify-center md:min-h-screen p-5 bg-green-50">
      {/* Lottie animation */}
      <div className="w-80 h-80">
        <DotLottieReact
          src="https://lottie.host/0c9b9e69-3c8a-45d2-a9e2-1c0b45e0e1f4/2jVXXwDVQH.lottie"
          loop={false}
          autoplay
        />
      </div>

      <h1 className="text-4xl font-bold text-green-700 mt-4 text-center">
        🎉 Payment Successful!
      </h1>
      <p className="text-green-800 mt-2 text-center text-lg">
        You are now registered for this event. See you there!
      </p>

      <div className="mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default EventPaymentSuccess;