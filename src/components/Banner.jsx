import { Link } from "react-router";
import slider1 from "../assets/banner1.jpg";
import slider2 from "../assets/banner2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "motion/react"; 

const Banner = () => {
  const slides = [
    {
      image: slider1,
      title: "Discover, Join, and Thrive in Local Communities",
      desc: "Connect with local clubs and make a difference with Community Connect.",
    },
    {
      image: slider2,
      title: "Discover, Join, and Thrive in Local Communities",
      desc: "Find your tribe, grow together, and impact your community positively.",
    },
  ];

  return (
    <section className="w-full mt-2">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={true}
        speed={800}
        className="h-[70vh] sm:h-[75vh] lg:h-[85vh] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/60" />

              <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
                <div className="max-w-3xl">
                  {/* Title */}
                  <motion.h1
                    className="font-bold text-white drop-shadow-xl
                                 text-2xl xs:text-3xl 
                                 sm:text-4xl lg:text-5xl 
                                 leading-snug sm:leading-tight text-shadow-md"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    className="mt-5 text-white/90 text-base xs:text-sm sm:text-md lg:text-lg drop-shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  >
                    {slide.desc}
                  </motion.p>

                  {/* Button */}
                  <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      to="/clubs"
                      className="rounded-full bg-primary
                                 px-8 py-3.5 text-lg font-semibold text-white 
                                 shadow-lg transition-all duration-300 
                                 hover:bg-primary/90 hover:scale-105 hover:shadow-xl 
                                 active:scale-98"
                    >
                      Join Club
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #61ae98;
          width: 10px;
          height: 10px;
        }
      `}</style>
    </section>
  );
};

export default Banner;