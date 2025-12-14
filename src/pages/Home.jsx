import Banner from "../components/Banner";
import FeaturedClubs from "../components/FeaturedClub";
import HowClubSphereWorks from "../components/HowClubSphereWorks";
import WhyJoinClubs from "../components/WhyJoinClubs";

const Home = () => {
    return (
        <>
            <div className='min-h-screen'>
                <Banner />
                <FeaturedClubs />
                <HowClubSphereWorks />
                <WhyJoinClubs />
            </div>
        </>
    );
};

export default Home;