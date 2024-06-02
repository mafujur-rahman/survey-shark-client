import {
    createBrowserRouter,

} from "react-router-dom";
import Home from "../layout/Pages/Home/Home";
import LogIn from "../layout/Pages/LogIn/LogIn";
import Register from "../layout/Pages/Register/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children:[
            {
                path:"/log-in",
                element:<LogIn></LogIn>
            },
            {
                path:"/register",
                element:<Register></Register>
            }
        ]
    },
]);
export default router;