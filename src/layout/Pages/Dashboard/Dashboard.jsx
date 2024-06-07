
import CreateSurvey from "./SurveyorDashboard/CreateSurvey";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-80 bg-[#074B5C] min-h-screen">
                {/* profile part */}
                <div>
                    <div className="flex gap-5 justify-center items-center bg-[#206f83]">
                        <div className="avatar">
                            <div className="my-5 w-20 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className="">
                            <h1 className=" text-white font-normal">Mark Juckerburg</h1>
                            <p className="text-green-500">Online</p>
                        </div>
                    </div>
                </div>
                {/* Links */}
                <div className="">
                    <h3 className="text-white my-4 ml-14">Surveyor</h3>
                    <div className="divider divider-error"></div>
                </div>
            </div>
            <div className="flex-1">
                <div className="">
                    <h2 className="text-2xl bg p-8 font-bold">Dashboard</h2>
                </div>
                
                <div className="p-5 bg-gray-200 min-h-screen">
                    <CreateSurvey></CreateSurvey>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;