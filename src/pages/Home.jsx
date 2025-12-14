import Banner from "../components/Banner";
import FeaturedClubs from "../components/FeaturedClub";

const Home = () => {
    return (
        <>
            <div className='min-h-screen'>
                <Banner />
                <FeaturedClubs />
            </div>
        </>
    );
};

export default Home;