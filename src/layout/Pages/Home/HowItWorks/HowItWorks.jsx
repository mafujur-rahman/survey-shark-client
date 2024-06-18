import { Link } from "react-router-dom";

const HowItWorks = () => {
    return (
        <div className="mt-16 mx-auto container px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900">Discover the Power of Surveys</h1>
            <p className="mt-5 mb-10 text-gray-600 text-center leading-relaxed">
                Our platform provides an intuitive and user-friendly experience for creating, participating in, and managing surveys.
                With a visually appealing interface and powerful features, we make it easy for you to gather valuable insights and
                make informed decisions.
            </p>
            <div className="flex flex-col md:flex-row gap-10 items-center justify-around">
                <div className="text-center max-w-xs">
                    <img className="h-36 w-36 mx-auto rounded-full shadow-lg" src="/engage.jpg" alt="Create Engaging Surveys" />
                    <h3 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">Create Engaging Surveys</h3>
                    <p className="text-gray-700 mt-2">Craft customized surveys with specific questions and options.</p>
                </div>
                <div className="text-center max-w-xs">
                    <img className="h-36 w-36 mx-auto rounded-full shadow-lg" src="/collect.png" alt="Collect Meaningful Responses" />
                    <h3 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">Collect Meaningful Responses</h3>
                    <p className="text-gray-700 mt-2">Easily manage and analyze survey responses in real-time.</p>
                </div>
                <div className="text-center max-w-xs">
                    <img className="h-36 w-36 mx-auto rounded-full shadow-lg" src="/insight.png" alt="Gain Valuable Insights" />
                    <h3 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">Gain Valuable Insights</h3>
                    <p className="text-gray-700 mt-2">Make data-driven decisions with comprehensive survey analytics.</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
                <button className="btn bg-[#074B5C] text-white px-6 py-3 rounded-md hover:bg-[#062F3D] transition duration-300">Learn More</button>
                <Link to='/register'>
                    <button className="btn bg-transparent border-2 border-[#074B5C] text-[#074B5C] px-6 py-3 rounded-md hover:bg-[#074B5C] hover:text-white transition duration-300">
                        Sign up
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HowItWorks;
