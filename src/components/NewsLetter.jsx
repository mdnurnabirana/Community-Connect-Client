import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }

    toast.success("Subscribed successfully! 🎉");
    setEmail("");
  };

  return (
    <section className="mb-24 mt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center bg-linear-to-br from-primary/70 to-primary/50 rounded-2xl p-8 sm:p-16 shadow-xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-neutral text-3xl sm:text-4xl font-bold text-center mb-3">
            Join Our Newsletter
          </h2>
          <p className="text-center text-neutral/95 mb-10 max-w-2xl mx-auto">
            Subscribe to receive exclusive updates, impactful stories, and the
            latest insights.
          </p>

          <motion.form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-base-100 border-2 border-secondary/30 text-neutral shadow-sm focus:outline-none focus:border-base-100 transition"
            />
            <button
              type="submit"
              className="w-auto px-8 py-4 rounded-xl bg-secondary text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Subscribe
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsLetter;