import axios from "axios";

export const imageUploadCloudinary = async (file) => {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.response?.data || error.message);
    throw new Error("Image upload failed");
  }
};