import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FiCamera, FiX } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { imageUploadCloudinary } from "../../utils";
import toast from "react-hot-toast";
import Loading from "../../shared/Loading";

const CreateClub = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: (clubData) => axiosSecure.post("/manager/clubs", clubData),
    onSuccess: () => {
      toast.success("Club created! Awaiting approval");
      reset();
      setBannerFile(null);
      setBannerPreview(null);
    },
    onError: (err) =>
      toast.error(`${err?.message || err} || Something went wrong!`),
  });

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be less than 3MB");
      return;
    }

    setBannerFile(file);
    setValue("banner", file);

    const reader = new FileReader();
    reader.onloadend = () => setBannerPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeBanner = (e) => {
    e.stopPropagation();
    setBannerFile(null);
    setBannerPreview(null);
    setValue("banner", null);
  };

  const onSubmit = async (data) => {
    if (!bannerFile) {
      toast.error("Banner image is required!");
      return;
    }

    setLoading(true);
    try {
      const imageURL = await imageUploadCloudinary(bannerFile);

      const clubData = {
        clubName: data.clubName,
        description: data.description,
        category: data.category,
        location: data.location,
        membershipFee: Number(data.membershipFee),
        bannerImage: imageURL,
        managerEmail: user?.email,
      };

      await mutateAsync(clubData);
    } catch (err) {
      toast.error(`${err} || Image upload or submission failed!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-10">
      <div className="max-w-3xl mx-auto bg-base-100 border border-base-300 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Create New Club
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Banner Image */}
          <div className="flex flex-col items-center">
            <div className="relative group w-full">
              {bannerPreview ? (
                <>
                  <img
                    src={bannerPreview}
                    alt="Banner"
                    className="w-full h-52 rounded-xl object-cover border-2 border-primary shadow-md"
                  />
                  <button
                    type="button"
                    onClick={removeBanner}
                    className="absolute top-2 right-2 bg-error text-white rounded-full p-2 shadow-lg hover:scale-105 transition"
                  >
                    <FiX size={18} />
                  </button>
                </>
              ) : (
                <label className="w-full h-52 rounded-xl bg-base-200 border-2 border-dashed border-base-300 flex flex-col items-center justify-center cursor-pointer hover:bg-base-300/50 transition">
                  <FiCamera className="text-4xl text-neutral mb-2" />
                  <span className="text-sm text-neutral">Upload Club Banner</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Club Name */}
          <div>
            <input
              {...register("clubName", { required: "Club name is required" })}
              placeholder="Club Name"
              className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none"
            />
            {errors.clubName && (
              <p className="text-error text-sm mt-1">{errors.clubName.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register("description", { required: true })}
              placeholder="Club Description"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              {...register("category", { required: true })}
              className="w-full appearance-none px-4 py-3 pr-12 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">Select Category</option>
              <option>Photography</option>
              <option>Sports</option>
              <option>Tech</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral text-lg">
              ▼
            </span>
          </div>

          {/* Location */}
          <input
            {...register("location", { required: true })}
            placeholder="City / Area"
            className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none"
          />

          {/* Membership Fee */}
          <input
            type="number"
            {...register("membershipFee", { required: true })}
            placeholder="Membership Fee (0 for free)"
            className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 focus:ring-2 focus:ring-primary outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-lg bg-primary text-white font-semibold shadow-md hover:bg-primary/80 transition flex items-center justify-center gap-2"
          >
            {loading ? <Loading height={30} width={30} color="#F43F5E" /> : "Create Club"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateClub;