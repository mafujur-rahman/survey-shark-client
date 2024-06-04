
import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import FeaturedSurveys from "./FeaturedSurveys/FeaturedSurveys";
import HowItWorks from "./HowItWorks/HowItWorks";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSurveys></FeaturedSurveys>
            <HowItWorks></HowItWorks>
            <Faq></Faq>
        </div>
    );
};

export default Home;