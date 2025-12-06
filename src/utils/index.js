import axios from "axios";

export const imageUploadCloudinary = async (file) => {
  if (!file) return "";

  const formData = new FormData();
  formData.append("file", file); 
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return data.secure_url; 
  } catch (err) {
    console.error("Cloudinary upload failed:", err.response?.data || err.message);
    throw new Error("Image upload failed. Please check file type & size.");
  }
};