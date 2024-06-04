import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";
import { Tooltip } from "react-tooltip";
import { useContext } from "react";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        logOut().then().catch();
    }

    return (
        <div className="bg-white shadow-md">
            <div className="navbar mx-auto container">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[3] p-2 shadow rounded-box w-52 text-xl font-semibold">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/surveys", label: "Surveyes" },
                                { to: "/my-surveys", label: "My Surveys" },
                                { to: "/dashboard/surveyor", label: "Dashboard" },
                                { to: "/wishlist", label: "Wishlist" }
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
                    <Link to="/">
                        <img className="w-24 h-auto lg:w-40" src={"/logo1.webp"} alt="Logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl font-semibold">
                        {[
                            { to: "/", label: "Home" },
                            { to: "/surveys", label: "Surveyes" },
                            { to: "/my-surveys", label: "My Surveys" },
                            { to: "/dashboard/surveyor", label: "Dashboard" },
                            { to: "/wishlist", label: "Wishlist" }
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
                            <a data-tooltip-id="my-tooltip-inline" data-tooltip-content={user.displayName}>
                                <div className="avatar online mr-5">
                                    <div className="w-16 rounded-full">
                                        <img src={user?.photoURL} alt="User" />
                                    </div>
                                </div>
                            </a>
                            <Tooltip id="my-tooltip-inline" style={{ backgroundColor: "#113065", color: "#fff" }} />
                            <button onClick={handleSignOut} className="btn bg-[#e4bb55] text-[#0e191b] border-none">Log Out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/log-in">
                                <button className="btn bg-[#e4bb55] text-[#0e191b] border-none mr-1">Log in</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn bg-[#e4bb55] text-[#0e191b] border-none">Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
