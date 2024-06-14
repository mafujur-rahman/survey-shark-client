import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { FaCheckCircle, FaComment, FaEdit, FaFlag, FaHome, FaMoneyCheckAlt, FaPen, FaPoll, FaTasks, FaUserCog } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaClipboardList } from "react-icons/fa6";


const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const AxiosSecure = UseAxiosSecure();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await AxiosSecure.get('/users');
            return res.data;
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Find the current user from the fetched users
    const currentUser = users.find(u => u.email === user.email);
    const isAdmin = currentUser?.role === 'admin';
    const isSurveyor = currentUser?.role === 'surveyor';
    const isProUser = currentUser?.role === 'pro-user';

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
                        ) : isProUser ?(
                            <h3 className="text-white mt-8 text-center">Pro User</h3>
                        ) : (<h3 className="text-white mt-8 text-center">User</h3>)
                    }
                    <div className="divider divider-error"></div>
                    <div>
                        {
                            // admin links
                            isAdmin ? <ul className="px-10">
                                <li>
                                    <NavLink
                                        to="/dashboard/admin/users"
                                        className={({ isActive }) =>
                                            isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                        }
                                    >
                                        <FaUserCog /> Manage Users & Roles
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/admin/surveys"
                                        className={({ isActive }) =>
                                            isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                        }
                                    >
                                        <FaTasks /> Publish/Unpublish Surveys
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/admin/payments"
                                        className={({ isActive }) =>
                                            isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                        }
                                    >
                                        <FaMoneyCheckAlt /> View All Payments
                                    </NavLink>
                                </li>
                            </ul>

                                // surveyor links
                                : isSurveyor ? <ul className="px-10">
                                    <li>
                                        <NavLink
                                            to="/dashboard/surveyor/create"
                                            className={({ isActive }) =>
                                                isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                            }
                                        >
                                            <FaPen /> Create Survey
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/surveyor/update"
                                            className={({ isActive }) =>
                                                isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                            }
                                        >
                                            <FaEdit /> Update  Survey
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/surveyor/surveys"
                                            className={({ isActive }) =>
                                                isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                            }
                                        >
                                            <FaClipboardList /> Survey Responses
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/surveyor/feedbacks"
                                            className={({ isActive }) =>
                                                isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                            }
                                        >
                                            <FaCheckCircle /> Admin Feedbacks
                                        </NavLink>
                                    </li>
                                </ul>


                                    // user links
                                    : <ul className="px-10">
                                        <li>
                                            <NavLink
                                                to="/dashboard/user/surveys"
                                                className={({ isActive }) =>
                                                    isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                                }
                                            >
                                                <FaPoll /> Participate
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/dashboard/user/my-reports"
                                                className={({ isActive }) =>
                                                    isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                                }
                                            >
                                                <FaFlag /> Reported Surveys
                                            </NavLink>
                                        </li>
                                        <li>
                                            {isProUser ? (
                                                <NavLink
                                                    to="/dashboard/user/comments"
                                                    className={({ isActive }) =>
                                                        isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                                    }
                                                >
                                                    <FaComment /> Comments
                                                </NavLink>
                                            ) : (
                                                <div className="relative group">
                                                    <button
                                                        className="btn bg-[#074b5c] text-white my-3 w-full cursor-not-allowed"
                                                        disabled
                                                    >
                                                        <FaComment /> Comments
                                                    </button>
                                                    <span className="absolute bottom-full mb-2 hidden w-full bg-black text-white text-center text-sm p-2 rounded group-hover:block">
                                                        Only pro users have access to this page
                                                    </span>
                                                </div>
                                            )}
                                        </li>
                                    </ul>
                        }
                        <div className="mt-40">
                            <p className="divider divider-error"></p>
                            <ul className="px-10">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive ? "btn bg-white text-black my-3 w-full" : "btn bg-[#074b5c] text-white my-3 w-full"
                                        }
                                    >
                                        <FaHome /> Home
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
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
                                <Outlet></Outlet>
                            </> : isSurveyor ?
                                <>
                                    <Outlet></Outlet>
                                </> :
                                <>
                                    <Outlet></Outlet>
                                </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
