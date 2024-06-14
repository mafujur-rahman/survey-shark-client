import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";
import { useContext } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaHome, FaPoll, FaMoneyCheckAlt, FaTasks } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        logOut().then().catch();
    };
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
    const currentUser = users.find(u => u.email === user?.email);
    const isAdmin = currentUser?.role === 'admin';
    const isSurveyor = currentUser?.role === 'surveyor';

    const dashboardLink = isAdmin
        ? "/dashboard/admin/users"
        : isSurveyor
        ? "/dashboard/surveyor/create"
        : "/dashboard/user/surveys";

    return (
        <div className="bg-white shadow-md">
            <div className="navbar mx-auto container">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[5] p-2 shadow bg-white rounded-box w-52 text-xl font-semibold">
                            {[
                                { to: "/", label: <><FaHome className="inline mr-2"/> Home</> },
                                { to: "/surveys", label: <><FaPoll className="inline mr-2"/> Surveys</> },
                                { to: "/pricing", label: <><FaMoneyCheckAlt className="inline mr-2"/> Pricing</> },
                                { to: dashboardLink, label: <><FaTasks className="inline mr-2"/> Dashboard</> },
                            ].map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        isActive ? "bg-[#074B5c] text-white p-2 rounded-md" : "text-black p-2 rounded-md"
                                    }
                                >
                                    <li><a>{item.label}</a></li>
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                    <Link to="/">
                        <img className="w-24 h-auto lg:w-40" src={"/logo1.webp"} alt="Logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl font-semibold">
                        {[
                            { to: "/", label: <><FaHome className="inline mr-2"/> Home</> },
                            { to: "/surveys", label: <><FaPoll className="inline mr-2"/> Surveys</> },
                            { to: "/pricing", label: <><FaMoneyCheckAlt className="inline mr-2"/> Pricing</> },
                            { to: dashboardLink, label: <><FaTasks className="inline mr-2"/> Dashboard</> },
                        ].map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive ? "bg-[#074B5c] text-white p-2 rounded-md" : "text-[#32474c] p-2 rounded-md"
                                }
                            >
                                <li><a>{item.label}</a></li>
                            </NavLink>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <>
                            <button onClick={handleSignOut} className="btn bg-[#074B5c] text-[#ffff] border-none">Log Out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/log-in">
                                <button className="btn bg-[#074B5c] text-white border-none mr-1">Log in</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn bg-[#074B5c] text-white border-none">Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
