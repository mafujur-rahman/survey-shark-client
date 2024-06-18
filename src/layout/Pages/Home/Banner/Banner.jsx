const Banner = () => {
    return (
        <div className="hero h-[370px] md:h-[500px] lg:h-[550px]" style={{ backgroundImage: `url('/banner-pic.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="hero-overlay bg-black bg-opacity-60"></div>
            <div className="text-center text-neutral-content flex items-center justify-center h-full">
                <div className="px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <h1 className="mb-5 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Create, Participate and <br className="hidden sm:block"/>Manage Surveys with Ease
                    </h1>
                    <p className="mb-8 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                        Welcome to our comprehensive platform designed to streamline the creation, participation, and <br className="hidden md:block"/> management of surveys. Discover the possibilities today!
                    </p>
                    <button className="btn bg-transparent text-white border-2 border-[#074B5C] hover:bg-[#074B5C] hover:text-white transition-all duration-300 px-8 py-3 rounded-full">
                        Explore
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
