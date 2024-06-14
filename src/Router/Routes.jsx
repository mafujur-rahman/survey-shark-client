import {
    createBrowserRouter,

} from "react-router-dom";
import Home from "../layout/Pages/Home/Home";
import LogIn from "../layout/Pages/LogIn/LogIn";
import Register from "../layout/Pages/Register/Register";
import Root from "../Root/Root";
import Dashboard from "../layout/Pages/Dashboard/Dashboard";
import CreateSurvey from "../layout/Pages/Dashboard/SurveyorDashboard/CreateSurvey";
import Surveys from "../layout/Pages/Surveys/Surveys";
import SurveyDetails from "../layout/Pages/SurveyDetails/SurveyDetails";
import ErrorPage from "../layout/Pages/ErrorPage/ErrorPage";
import PricingPage from "../layout/Pages/PricingPage/PricingPage";
import PaymentPage from "../layout/Pages/PricingPage/PaymentForm/PaymentPage";
import AllUsers from "../layout/Pages/Dashboard/AdminDashboard/AllUsers";
import ManageSurveys from "../layout/Pages/Dashboard/AdminDashboard/ManageSurveys";
import UpdateSurvey from "../layout/Pages/Dashboard/SurveyorDashboard/UpdateSurvey";
import UpdateSingleSurvey from "../layout/Pages/Dashboard/SurveyorDashboard/UpdateSingleSurvey";
import ViewSurveys from "../layout/Pages/Dashboard/SurveyorDashboard/ViewSurvey";
import ViewSurveyDetails from "../layout/Pages/Dashboard/SurveyorDashboard/ViewSurveyDetails";
import SurveyFeedback from "../layout/Pages/Dashboard/SurveyorDashboard/SurveyFeedback";
import ViewAllData from "../layout/Pages/Dashboard/AdminDashboard/ViewAllData";
import Participate from "../layout/Pages/Dashboard/UserDashboard/Participate";
import ReportedSurvey from "../layout/Pages/Dashboard/UserDashboard/ReportedSurvey";
import Comments from "../layout/Pages/Dashboard/UserDashboard/Comments";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


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
            },
            {
                path:"/pricing",
                element:<PrivateRoute><PricingPage></PricingPage></PrivateRoute>
            },
            {
                path:"/payment",
                element:<PaymentPage></PaymentPage>
            }
        ]
    },
    {
        path:"dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            // admin routes
            {
                path: "admin/users",
                element:<AllUsers></AllUsers>
            },
            {
                path:'admin/surveys',
                element:<ManageSurveys></ManageSurveys>
            },
            {
                path:'admin/payments',
                element:<ViewAllData></ViewAllData>
            },

            // surveyor routes
            {
                path:"surveyor/create",
                element:<CreateSurvey></CreateSurvey>
            },
            {
                path:'surveyor/update',
                element:<UpdateSurvey></UpdateSurvey>
            },
            {
                path:'surveyor/update/:id',
                element: <UpdateSingleSurvey></UpdateSingleSurvey>
            },
            {
                path:'surveyor/surveys',
                element:<ViewSurveys></ViewSurveys>
            },
            {
                path:'surveyor/surveys/:id',
                element:<ViewSurveyDetails></ViewSurveyDetails>
            },
            {
                path:'surveyor/feedbacks',
                element:<SurveyFeedback></SurveyFeedback>
            },

            // user routes
            {
                path: 'user/surveys',
                element:<Participate></Participate>
            },
            {
                path: 'user/my-reports',
                element:<ReportedSurvey></ReportedSurvey>
            },
            {
                path:'user/comments',
                element: <Comments></Comments>
            }
        ]
    }
]);
export default router;