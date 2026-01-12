import { FaWalking } from "react-icons/fa";
import Banner from "../components/Banner";
import FeaturedClubs from "../components/FeaturedClub";
import HowClubSphereWorks from "../components/HowClubSphereWorks";
import NewsLetter from "../components/NewsLetter";
import Testimonials from "../components/Testimonials";
import WhyJoinClubs from "../components/WhyJoinClubs";
import FAQ from "../components/FAQ";

const Home = () => {
    return (
        <>
            <div className='min-h-screen'>
                <Banner />
                <FeaturedClubs />
                <HowClubSphereWorks />
                <WhyJoinClubs />
                <Testimonials />
                <NewsLetter />
                <FAQ />
            </div>
        </>
    );
};

export default Home;