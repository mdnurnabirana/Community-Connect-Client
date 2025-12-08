import React from "react";
import { useNavigate, Link } from "react-router";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      {/* Lottie animation */}
      <div className="w-96 h-96">
        <DotLottieReact
          src="https://lottie.host/156118d1-bd1a-4610-a6d9-12f70a637c16/vFRQjCWjek.lottie"
          loop
          autoplay
        />
      </div>

      <h1 className="text-3xl font-bold text-neutral mt-4">Oops! Something went wrong.</h1>
      <p className="text-neutral mt-2">The page you are looking for does not exist.</p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus transition"
        >
          Go Back
        </button>

        <Link
          to="/"
          className="px-4 py-2 bg-secondary text-white rounded-lg shadow hover:bg-secondary-focus transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;