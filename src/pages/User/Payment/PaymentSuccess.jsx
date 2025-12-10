import { useSearchParams } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      await axiosSecure.post("/payment-success", {
        sessionId,
      });
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful! You are now a member.
      </h1>
    </div>
  );
};

export default PaymentSuccess;