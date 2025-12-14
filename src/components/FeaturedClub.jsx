import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import Container from "../shared/Container";
import Loading from "../shared/Loading";
import { motion } from "motion/react"; 

const FeaturedClubs = () => {
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featured-clubs"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubs/featured`
      );
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-40">
        <Loading />
      </div>
    );

  return (
    <Container>
      <div className="my-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
          Featured Clubs
        </h2>
        <p className="text-center text-neutral/80 mb-10 max-w-2xl mx-auto">
          Discover some of our highlighted communities and join one that fits
          your interests.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {clubs.map((club, index) => (
            <motion.div
              key={club._id}
              className="group bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-neutral mb-2">
                  {club.clubName}
                </h3>
                <p className="text-neutral/80 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4 flex-1">
                  {club.description || "No description available."}
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
                  <span className="px-2 sm:px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                    {club.category}
                  </span>
                  <span className="px-2 sm:px-3 py-1 text-sm font-semibold text-accent bg-accent/10 rounded-full">
                    {club.membershipFee === 0
                      ? "Free"
                      : `$${club.membershipFee}`}
                  </span>
                </div>

                <Link
                  to={`/club/${club._id}`}
                  className="w-full py-2 sm:py-3 bg-primary hover:bg-primary/90 text-white text-center rounded-xl font-semibold transition-colors shadow"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            to="/clubs"
            className="px-6 py-3 bg-linear-to-r from-primary via-primary/80 to-primary/60 shadow-md text-white rounded-lg hover:opacity-90 transition"
          >
            Show More
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default FeaturedClubs;