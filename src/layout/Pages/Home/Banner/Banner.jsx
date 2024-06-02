

const Banner = () => {
    return (
        <div className="hero h-[370px] md:h-[500px] lg:h-[550px]" style={{ backgroundImage: `url('/banner-pic.jpg')` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-4xl md:text-5xl font-bold">Create, Participate and Manage Surveys with Ease</h1>
                    <p className="mb-5">Welcome to our comprehensive platform designed to streamline the creation, participation, and management of surveys. Discover the possibilities today!</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;