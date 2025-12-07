import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FiCamera, FiEye, FiEyeOff, FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { imageUploadCloudinary } from "../../utils";
import axios from "axios";
import Loading from "../../shared/Loading";

const Register = () => {
  const { createUser, updateUserProfile, setUser, loading, signInWithGoogle } =
    useAuth();
  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState(null);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be less than 3MB");
      setPhotoFile(null);
      setPhotoPreview(null);
      setValue("photo", null);

      return;
    }

    setValue("photo", file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removePhoto = (e) => {
    e.stopPropagation();
    setPhotoPreview(null);
    setValue("photo", null);
  };

  const saveUserToBackend = async (userObj) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user`, userObj);
    } catch (err) {
      toast.error("Failed to save user");
      throw err;
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      let imageURL = "https://avatar.iran.liara.run/public/11";
      if (photoFile) imageURL = await imageUploadCloudinary(photoFile);

      const result = await createUser(email, password);
      await updateUserProfile(name, imageURL);

      const userData = {
        name,
        email,
        image: imageURL,
      };

      await saveUserToBackend(userData);

      setUser(result.user);

      toast.success("Signup successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Signup failed");
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
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-base-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary">Join ClubSphere</h1>
            <p className="text-neutral mt-2">
              Create your account and discover local clubs
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Photo */}
            <div className="flex justify-center">
              <div className="relative group">
                {photoPreview ? (
                  <>
                    <img
                      src={photoPreview}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600"
                    >
                      <FiX size={16} />
                    </button>
                  </>
                ) : (
                  <div className="w-28 h-28 rounded-full bg-base-200 border-4 border-dashed border-base-300 flex flex-col items-center justify-center gap-1">
                    <FiCamera className="text-3xl text-base-400" />
                    <span className="text-xs text-neutral">No photo</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral mb-1">
                Upload Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                onChange={handlePhotoChange}
                className="w-full px-4 py-3 rounded-lg border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <p className="text-xs text-neutral mt-1">JPG, PNG • Max 3MB</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                {...register("name", { required: "Full name is required" })}
                className="w-full px-4 py-3 rounded-lg border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                    message: "Must contain uppercase & lowercase letters",
                  },
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
              className="flex justify-center items-center w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-[#0F766E] transition-all shadow-md"
            >
              {loading ? (
                <Loading height={32} width={32} color="#F43F5E" />
              ) : (
                "Create Account"
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
            className="w-full flex items-center justify-center gap-3 border border-base-300 hover:border-primary text-neutral font-medium py-3 mt-4 rounded-lg transition-all"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <p className="text-center mt-6 text-neutral">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;