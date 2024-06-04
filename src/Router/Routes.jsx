import {
    createBrowserRouter,

} from "react-router-dom";
import Home from "../layout/Pages/Home/Home";
import LogIn from "../layout/Pages/LogIn/LogIn";
import Register from "../layout/Pages/Register/Register";
import Root from "../Root/Root";
import Dashboard from "../layout/Pages/Dashboard/Dashboard";
import SurveyorDashboard from "../layout/Pages/Dashboard/SurveyorDashboard/SurveyorDashboard";
import CreateSurvey from "../layout/Pages/Dashboard/SurveyorDashboard/CreateSurvey";
import Surveys from "../layout/Pages/Surveys/Surveys";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/log-in",
                element:<LogIn></LogIn>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/surveys",
                element:<Surveys></Surveys>
            }
        ]
    },
    {
        path:"dashboard",
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:"surveyor",
                element:<SurveyorDashboard></SurveyorDashboard>
            },
            {
                path:"surveyor/create",
                element:<CreateSurvey></CreateSurvey>
            }
        ]
    }
]);
export default router;