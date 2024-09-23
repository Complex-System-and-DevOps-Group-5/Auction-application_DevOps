import {RouteObject} from "react-router-dom";
import App from "./App.tsx";
import AuthPage from "./Pages/AuthPage.tsx";
import {HomePage} from "./Pages/HomePage.tsx";
import OngoingPage from "./Pages/OngoingPage.tsx";
import HitListPage from "./Pages/HitlistPage.tsx";
import BiddingsHistoryPage from "./Pages/BiddingsHistoryPage.tsx";
import AboutPage from "./Pages/AboutPage.tsx";


export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/authentication",
                element: <AuthPage/>,
            },
            {
                path: "/ongoing",
                element: <OngoingPage/>,
            },
            {
                path: "/hitlist",
                element: <HitListPage/>,
            },
            {
                path: "/biddingshistory",
                element: <BiddingsHistoryPage/>,
            },
            {
                path: "/about",
                element: <AboutPage/>,
            },
        ],
    }
];