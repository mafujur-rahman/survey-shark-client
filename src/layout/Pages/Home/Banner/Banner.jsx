

const Banner = () => {
    return (
        <div className="hero h-[370px] md:h-[500px] lg:h-[550px]" style={{ backgroundImage: `url('/banner-pic.jpg')` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className=" text-center text-neutral-content">
                <div className="">
                    <h1 className="mb-5 text-4xl md:text-5xl font-bold">Create, Participate and <br />Manage Surveys with Ease</h1>
                    <p className="mb-5">Welcome to our comprehensive platform designed to streamline the creation, participation, and <br /> management of surveys. Discover the possibilities today!</p>
                    <button className="btn bg-[#074B5C] text-white border-2 border-[#074B5C]">Explore</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;