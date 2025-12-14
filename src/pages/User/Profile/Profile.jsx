import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiCamera, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUploadCloudinary } from "../../../utils";

const Profile = () => {
  const { user, updateUserProfile, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL || null);
  const [name, setName] = useState(user?.displayName || "");
  const [updating, setUpdating] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (user) {
      setValue("name", user.displayName || "");
      setName(user.displayName || "");
      setPhotoPreview(user.photoURL || null);
    }
  }, [user, setValue]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be less than 3MB");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removePhoto = (e) => {
    e.stopPropagation();
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const onSubmit = async (data) => {
    const { name } = data;
    setUpdating(true);
    try {
      let imageURL = photoPreview || "https://avatar.iran.liara.run/public/11";
      if (photoFile) {
        imageURL = await imageUploadCloudinary(photoFile);
      }
      await updateUserProfile(name, imageURL);
      const token = await user.getIdToken(true);
      setUser((prev) => ({ ...prev, accessToken: token }));
      toast.success("Firebase profile updated!");
      const res = await axiosSecure.patch("/user/profile", {
        name,
        image: imageURL,
      });
      if (res.data.success) {
        toast.success("Profile updated successfully on server!");
      } else {
        toast.error("Backend update failed!");
      }
    } catch (err) {
      toast.error(`${err} || Failed to update profile`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <title>CC - My Profile</title>
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-base-200">
        <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              {...register("name", { required: true })}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-200 cursor-not-allowed text-neutral"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-md"
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;