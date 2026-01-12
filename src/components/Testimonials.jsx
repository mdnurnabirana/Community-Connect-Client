import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "motion/react";

import "swiper/css";
import avatarFallback from "../assets/avatar.png";

const testimonials = [
  {
    name: "Rina Akter",
    role: "Volunteer · River Cleanup",
    quote:
      "Participating in the river cleanup was eye-opening. The organizers were so professional, and I felt my contribution mattered.",
  },
  {
    name: "Shuvo Rahman",
    role: "Participant · Tree Plantation",
    quote:
      "The plantation event was well-coordinated. I met so many like-minded people and enjoyed giving back to the community.",
  },
  {
    name: "Nadia Hasan",
    role: "Organizer · Food Drive",
    quote:
      "Organizing the food drive was seamless thanks to the platform. Volunteers were enthusiastic, and everything ran smoothly.",
  },
  {
    name: "Fahim Karim",
    role: "Volunteer · Donation Campaign",
    quote:
      "I loved how small efforts turned into real impact. The teamwork and positive energy were inspiring.",
  },
  {
    name: "Tania Chowdhury",
    role: "Community Member",
    quote:
      "This platform connects people genuinely caring for the community. It feels like being part of a movement, not just an event.",
  },
  {
    name: "Rafiq Mahmud",
    role: "Student Volunteer",
    quote:
      "As a student, I learned leadership and teamwork while contributing meaningfully. Truly a rewarding experience.",
  },
];

const Testimonials = () => {
  return (
    <section className="my-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-neutral text-3xl sm:text-4xl font-bold text-center mb-3">
            Voices From Our Community
          </h2>
          <p className="text-center text-neutral/95 mb-10 max-w-2xl mx-auto">
            Hear from volunteers and organizers who are creating real change
            across Bangladesh
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={24}
          slidesPerView={1}
          grabCursor
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="px-4 h-full flex">
              <motion.div
                className="group h-full flex flex-col justify-between bg-linear-to-b from-base-200 to-base-100 rounded-xl shadow-lg p-5 border border-base-200 transition-all hover:shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <div>
                  <FaQuoteLeft className="text-primary/40 text-2xl mb-4" />
                  <p className="text-neutral/90 leading-relaxed line-clamp-3 mb-4">
                    “{item.quote}”
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={avatarFallback}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-primary/30"
                  />
                  <div>
                    <h4 className="font-semibold text-neutral">{item.name}</h4>
                    <p className="text-sm text-neutral/70">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;