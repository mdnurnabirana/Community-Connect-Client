import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Container from "../../shared/Container";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Loading from "../../shared/Loading";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signInWithGoogle, loading, setUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveUserToBackend = async (userObj) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user`, userObj);
    } catch (err) {
      toast.error("Failed to save user");
      throw err;
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await signIn(email, password);

      const firebaseUser = result.user;

      const unifiedUser = {
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email,
        image:
          firebaseUser.photoURL || "https://avatar.iran.liara.run/public/11",
      };

      setUser(unifiedUser);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        image:
          result.user.photoURL || "https://avatar.iran.liara.run/public/11",
      };

      await saveUserToBackend(userData);
      setUser(result.user);

      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
    }
  };

  return (
    <section className="min-h-screen py-8">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-base-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary">Welcome Back!</h1>
              <p className="text-neutral mt-2">
                Log in to manage your clubs and events
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-3 rounded-lg border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-neutral mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-xl text-neutral"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex justify-center items-center w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-[#0F766E] transition-all shadow-md disabled:opacity-70"
              >
                {loading ? (
                  <Loading height={32} width={32} color="#F43F5E" />
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-base-300"></div>
              <span className="px-4 text-sm text-neutral">OR</span>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-base-300 hover:border-primary text-neutral font-medium py-3 rounded-lg transition-all disabled:opacity-70"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>

            <p className="text-center mt-6 text-neutral">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-semibold hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Login;