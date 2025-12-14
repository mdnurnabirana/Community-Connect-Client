import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await axiosSecure.post("/payment-success", { sessionId });
      } catch (error) {
        console.error("Payment verification failed:", error);
      }
    };

    if (sessionId) verifyPayment();
  }, [sessionId, axiosSecure]);

  return (
    <>
      <title>CC - Club Payment</title>
      <div className="flex flex-col items-center justify-center md:min-h-screen p-5">
        <div className="w-96 h-96">
          <DotLottieReact
            src="https://lottie.host/2da4a828-77d1-42c1-b779-6d5972c6ff42/uJFPgIlwmm.lottie"
            loop
            autoplay
          />
        </div>

        <h1 className="text-4xl font-bold text-neutral text-center">
          Payment Successful!
        </h1>
        <p className="text-neutral/90 mt-2 text-center text-lg">
          🎉 Congratulations! You are now a verified member. Enjoy all the
          benefits.
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/80 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;