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
import SurveyDetails from "../layout/Pages/SurveyDetails/SurveyDetails";
import ErrorPage from "../layout/Pages/ErrorPage/ErrorPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement:<ErrorPage></ErrorPage>,
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
            },
            {
                path:"/survey-details/:id",
                element:<SurveyDetails></SurveyDetails>
            }
        ]
    },
    {
        path:"dashboard",
        element:<Dashboard></Dashboard>,
        errorElement:<ErrorPage></ErrorPage>,
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