import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="mx-auto container mt-10">
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-[#074B5C]">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 text-white px-2 mx-2">Surveyor Dashboard</div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal text-white">
                                {/* Navbar menu content here */}
                                <li><NavLink to="/dashboard/surveyor/create">Create Survey</NavLink></li>
                                <li><NavLink to="/dashboard/surveyor/update/:id">Update Survey</NavLink></li>
                                <li><NavLink to="/dashboard/surveyor/surveys">Surveys</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    {/* Page content here */}
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        {/* Sidebar content here */}
                        <li><NavLink to="/dashboard/surveyor/create">Create Survey</NavLink></li>
                        <li><NavLink to="/dashboard/surveyor/update/:id">Update Survey</NavLink></li>
                        <li><NavLink to="/dashboard/surveyor/surveys">Surveys</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;