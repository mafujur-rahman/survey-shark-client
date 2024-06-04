
import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import FeaturedSurveys from "./FeaturedSurveys/FeaturedSurveys";
import HowItWorks from "./HowItWorks/HowItWorks";
import LatestSurveys from "./LatestSurveys/LatestSurveys";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSurveys></FeaturedSurveys>
            <LatestSurveys></LatestSurveys>
            <HowItWorks></HowItWorks>
            <Faq></Faq>
        </div>
    );
};

export default Home;