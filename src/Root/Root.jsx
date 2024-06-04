import { Outlet } from "react-router-dom";
import Navbar from "../layout/Pages/Home/Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;