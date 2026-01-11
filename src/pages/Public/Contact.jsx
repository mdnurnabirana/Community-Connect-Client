import React, { useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const responseAdmin = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: import.meta.env.VITE_SERVICE_ID,
            template_id: import.meta.env.VITE_TEMPLATE_ID,
            user_id: import.meta.env.VITE_USER_ID,
            template_params: { ...formData },
          }),
        }
      );

      if (!responseAdmin.ok) throw new Error("Failed to send admin email");

      const responseUser = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: import.meta.env.VITE_SERVICE_ID,
            template_id: import.meta.env.VITE_CONFIRMATION_TEMPLATE_ID,
            user_id: import.meta.env.VITE_USER_ID,
            template_params: {
              name: formData.name,
              email: formData.email,
              message: formData.message,
              time: new Date().toLocaleString(),
              year: new Date().getFullYear(),
            },
          }),
        }
      );

      if (!responseUser.ok)
        throw new Error("Failed to send confirmation email");

      toast.success("Message sent! Please check your email.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-12">
      <title>Contact Us</title>

      <div className="max-w-3xl mx-auto px-4">
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-neutral mb-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Get in Touch
        </motion.h1>

        <motion.div
          className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-neutral mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 text-neutral focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 text-neutral focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 text-neutral focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 text-neutral focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-primary/80 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;