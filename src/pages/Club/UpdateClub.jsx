import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import toast from "react-hot-toast";
import { FiCamera, FiX } from "react-icons/fi";
import { imageUploadCloudinary } from "../../utils";

const UpdateClub = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clubName: "",
      description: "",
      category: "",
      location: "",
      membershipFee: "",
    },
  });

  const { data: club, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => (await axiosSecure.get(`/clubs/${id}`)).data,
  });

  useEffect(() => {
    if (club) {
      // Reset form values
      reset({
        clubName: club.clubName || "",
        description: club.description || "",
        category: club.category || "",
        location: club.location || "",
        membershipFee: club.membershipFee || "",
      });

      // Schedule banner preview update after the current render
      setTimeout(() => {
        setBannerPreview(club.bannerImage || null);
      }, 0);
    }
  }, [club, reset]);

  const updateMutation = useMutation({
    mutationFn: (clubData) => axiosSecure.patch(`/clubs/${id}`, clubData),
    onSuccess: () => {
      toast.success("Club updated successfully!");
      queryClient.invalidateQueries(["club", id]);
      navigate("/dashboard/manage-club");
    },
    onError: () => toast.error("Failed to update club!"),
  });

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be less than 3MB");
      return;
    }

    setBannerFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setBannerPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeBanner = () => {
    setBannerFile(null);
    setBannerPreview(null);
  };

  const onSubmit = async (data) => {
    try {
      let imageURL = bannerPreview;
      if (bannerFile) {
        imageURL = await imageUploadCloudinary(bannerFile);
      }

      if (!imageURL) {
        toast.error("Banner image is required");
        return;
      }

      const updatedClub = {
        ...data,
        membershipFee: Number(data.membershipFee),
        bannerImage: imageURL,
      };

      updateMutation.mutate(updatedClub);
    } catch (err) {
      toast.error(`${err} || Image upload failed!`);
    }
  };

  if (isLoading || !club) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 border border-base-300 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        Update Club
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Banner */}
        <div className="flex flex-col items-center">
          <div className="relative w-full">
            {bannerPreview ? (
              <>
                <img
                  src={bannerPreview}
                  alt="Banner"
                  className="w-full h-52 object-cover rounded-xl border-2 border-primary shadow-md"
                />
                <button
                  type="button"
                  onClick={removeBanner}
                  className="absolute top-2 right-2 bg-error text-white rounded-full p-2"
                >
                  <FiX size={18} />
                </button>
              </>
            ) : (
              <label className="w-full h-52 flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-xl bg-base-200 cursor-pointer">
                <FiCamera className="text-4xl text-neutral mb-2" />
                <span className="text-sm text-neutral">Upload Banner</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleBannerChange}
                />
              </label>
            )}
          </div>
        </div>

        <input
          {...register("clubName", { required: "Club name is required" })}
          placeholder="Club Name"
          className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary"
        />
        {errors.clubName && (
          <p className="text-error text-sm">{errors.clubName.message}</p>
        )}

        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Description"
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary"
        />
        {errors.description && (
          <p className="text-error text-sm">{errors.description.message}</p>
        )}

        <select
          {...register("category", { required: "Category is required" })}
          className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Category</option>
          <option value="Photography">Photography</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
        </select>
        {errors.category && (
          <p className="text-error text-sm">{errors.category.message}</p>
        )}

        <input
          {...register("location", { required: "Location is required" })}
          placeholder="Location"
          className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary"
        />
        {errors.location && (
          <p className="text-error text-sm">{errors.location.message}</p>
        )}

        <input
          type="number"
          {...register("membershipFee", {
            required: "Membership Fee is required",
          })}
          placeholder="Membership Fee"
          className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 focus:ring-2 focus:ring-primary"
        />
        {errors.membershipFee && (
          <p className="text-error text-sm">{errors.membershipFee.message}</p>
        )}

        <button
          type="submit"
          disabled={updateMutation.isLoading}
          className="w-full py-3.5 bg-primary text-white rounded-lg font-semibold shadow-md flex justify-center items-center"
        >
          {updateMutation.isLoading ? "Updating..." : "Update Club"}
        </button>
      </form>
    </div>
  );
};

export default UpdateClub;