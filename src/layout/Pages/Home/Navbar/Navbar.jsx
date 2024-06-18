import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import { FaHome, FaPoll, FaMoneyCheckAlt, FaTasks } from "react-icons/fa";
import useAdmin from "../../../../Hooks/useAdmin";
import useSurveyor from "../../../../Hooks/useSurveyor";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        logOut().then().catch();
    };
    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();

    const dashboardLink = isAdmin
        ? "/dashboard/admin/users"
        : isSurveyor
            ? "/dashboard/surveyor/create"
            : "/dashboard/user/surveys";

    const navItems = [
        { to: "/", label: <><FaHome className="inline mr-2" /> Home</> },
        { to: "/surveys", label: <><FaPoll className="inline mr-2" /> Surveys</> },
        { to: "/pricing", label: <><FaMoneyCheckAlt className="inline mr-2" /> Pricing</> },
        { to: dashboardLink, label: <><FaTasks className="inline mr-2" /> Dashboard</> },
    ];

    return (
        <div className="bg-white shadow-md">
            <div className="navbar mx-auto container flex justify-between items-center py-4">
                <div className="navbar-start flex items-center">
                    <div className="dropdown lg:hidden">
                        <button tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>
                        <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 text-xl font-semibold">
                            {navItems.map(item => (
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
                        <img className="w-24 h-auto lg:w-40" src="/logo1.webp" alt="Logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl font-semibold">
                        {navItems.map(item => (
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
                <div className="navbar-end flex items-center">
                    {user ? (
                        <>
                                <div className="avatar mr-5">
                                    <div className="w-16 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>
                            
                            <button onClick={handleSignOut} className="btn bg-[#074B5c] text-white border-none">Log Out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/log-in">
                                <button className="btn bg-[#074B5c] text-white border-none mr-2">Log In</button>
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
