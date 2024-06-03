
const HowItWorks = () => {
    return (
        <div className="mt-16 mx-auto container px-4 md:px-8">
            <h1 className="text-4xl font-bold text-center">Discover the Power of Surveys</h1>
            <p className="mt-5 mb-10 text-gray-700 text-center">
                Our platform provides an intuitive and user-friendly experience for creating, participating in, and <br className="hidden md:inline" /> 
                managing surveys. With a visually appealing interface and powerful features, we make it easy for <br className="hidden md:inline" /> 
                you to gather valuable insights and make informed decisions.
            </p>
            <div className="flex flex-col md:flex-row gap-5 items-center justify-around">
                <div className="text-center">
                    <img className="h-36 w-36 mx-auto" src="/engage.jpg" alt="Create Engaging Surveys" />
                    <h3 className="text-3xl font-bold">Create Engaging Surveys</h3>
                    <p className="text-gray-700 mt-2">Craft customized surveys with specific questions <br className="hidden lg:inline" /> 
                        and options.
                    </p>
                </div>
                <div className="text-center">
                    <img className="h-36 w-36 mx-auto" src="/collect.png" alt="Collect Meaningful Responses" />
                    <h3 className="text-3xl font-bold">Collect Meaningful Responses</h3>
                    <p className="text-gray-700 mt-2">Easily manage and analyze survey responses <br className="hidden lg:inline" /> 
                        in real-time.
                    </p>
                </div>
                <div className="text-center">
                    <img className="h-36 w-36 mx-auto" src="/insight.png" alt="Gain Valuable Insights" />
                    <h3 className="text-3xl font-bold">Gain Valuable Insights</h3>
                    <p className="text-gray-700 mt-2">Make data-driven decisions with comprehensive <br className="hidden lg:inline" /> 
                        survey analytics.
                    </p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
                <button className="btn bg-transparent border-2 border-[#074B5C] px-4 py-2">Learn More</button>
                <button className="btn bg-transparent border-2 border-[#074B5C] px-4 py-2">Sign up</button>
            </div>
        </div>
    );
};

export default HowItWorks;
