import { useContext } from "react";
import CreateSurvey from "./SurveyorDashboard/CreateSurvey";
import { AuthContext } from "../../../Context/AuthProvider";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import { FaMoneyCheckAlt, FaTasks, FaUserCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const isAdmin = true;
    const isSurveyor = true;
    return (
        <div className="flex">
            <div className="w-80 bg-[#074B5C] min-h-screen">
                {/* profile part */}
                <div>
                    <div className="flex gap-5 justify-center items-center bg-[#206f83]">
                        <div className="avatar">
                            <div className="my-5 w-20 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </div>
                        <div className="">
                            <h1 className=" text-white font-normal">{user.displayName}</h1>
                            <p className="text-green-500">Online</p>
                        </div>
                    </div>
                </div>
                {/* Links */}
                <div className="">
                    {
                        isAdmin ? (
                            <h3 className="text-white mt-8 text-center">Admin</h3>
                        ) : isSurveyor ? (
                            <h3 className="text-white mt-8 text-center">Surveyor</h3>
                        ) : (
                            <h3 className="text-white mt-8 text-center">User</h3>
                        )
                    }
                    <div className="divider divider-error"></div>
                    <div>
                        <ul className="px-10">
                            <Link to='/dashboard/admin/users'><button className="btn bg-transparent text-white  w-full my-2"> <FaUserCog></FaUserCog> Manage Users & Roles</button></Link>
                            <button className="btn bg-transparent text-white  w-full my-2"> <FaTasks></FaTasks> Publish/Unpublish Surveys</button>
                            <button className="btn bg-transparent text-white  w-full my-2"> <FaMoneyCheckAlt></FaMoneyCheckAlt> View Payments </button>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className="">
                    <h2 className="text-2xl bg p-8 font-bold">Dashboard</h2>
                </div>
                <div className="p-5 bg-gray-200 min-h-screen">
                    {
                        isAdmin ?
                            <>
                                <AdminDashboard></AdminDashboard>
                            </> : isSurveyor ?
                                <>
                                    <CreateSurvey></CreateSurvey>
                                </> :
                                <>

                                </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
