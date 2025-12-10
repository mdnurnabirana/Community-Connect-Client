import { useSearchParams } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const EventPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await axiosSecure.post("/event-payment-success", {
          sessionId,
        });
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
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-3">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-600">
          You are now registered for this event.
        </p>
      </div>
    </div>
  );
};

export default EventPaymentSuccess;