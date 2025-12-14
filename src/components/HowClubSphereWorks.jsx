import React from "react";
import Container from "../shared/Container";
import { FiSearch, FiPlayCircle, FiUsers, FiStar } from "react-icons/fi";

const HowClubSphereWorks = () => {
  const steps = [
    {
      icon: FiSearch,
      title: "Explore Clubs",
      description:
        "Browse different categories to find the perfect club for your interests.",
    },
    {
      icon: FiPlayCircle,
      title: "Join a Club",
      description:
        "Sign up quickly and start participating in your chosen club immediately.",
    },
    {
      icon: FiUsers,
      title: "Connect",
      description:
        "Meet members, attend events, and collaborate with like-minded people.",
    },
    {
      icon: FiStar,
      title: "Grow",
      description:
        "Learn new skills, share knowledge, and expand your network effectively.",
    },
  ];

  return (
    <Container>
      <div className="my-20 text-center p-4">
        <h2 className="text-3xl font-bold mb-6">How ClubSphere Works</h2>
        <p className="text-neutral/80 mb-12 max-w-2xl mx-auto">
          Joining and participating in a club is simple. Follow these steps to
          get started.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-linear-to-br from-base-100 to-base-300 rounded-xl shadow hover:shadow-lg transition"
              >
                <Icon size={40} className="text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-neutral/70 text-sm text-center">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default HowClubSphereWorks;