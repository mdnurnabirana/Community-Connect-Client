import React from "react";
import Container from "../shared/Container";
import { FiUsers, FiBook, FiStar, FiGlobe } from "react-icons/fi";
import { motion } from "motion/react";

const WhyJoinClubs = () => {
  const benefits = [
    {
      icon: FiUsers,
      title: "Connect with People",
      description:
        "Meet like-minded individuals and expand your social network through engaging activities.",
    },
    {
      icon: FiBook,
      title: "Learn New Skills",
      description:
        "Clubs offer opportunities to learn, practice, and improve your knowledge in a fun environment.",
    },
    {
      icon: FiStar,
      title: "Boost Your Profile",
      description:
        "Showcase your involvement in clubs on resumes, portfolios, or personal growth journeys.",
    },
    {
      icon: FiGlobe,
      title: "Explore Interests",
      description:
        "Discover new hobbies, passions, and global perspectives through diverse club activities.",
    },
  ];

  return (
    <Container>
      <div className="my-20 text-center p-4">
        <h2 className="text-neutral text-3xl font-bold mb-6">Why Join a Club?</h2>
        <p className="text-neutral/95 mb-12 max-w-2xl mx-auto">
          Joining a club can transform your learning, social life, and personal
          growth. Here are a few reasons why it’s worth it:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 bg-linear-to-br from-base-300 to-base-100 rounded-xl shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                <Icon size={40} className="text-primary mb-4" />
                <h3 className="text-neutral font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-neutral/80 text-sm text-center">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default WhyJoinClubs;