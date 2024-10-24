import {RouteObject} from "react-router-dom";
import App from "./App.tsx";
import AuthPage from "./Pages/AuthPage.tsx";
import {HomePage} from "./Pages/HomePage.tsx";
import OngoingPage from "./Pages/OngoingPage.tsx";
import TrendingPage from "./Pages/TrendingPage.tsx";
import BiddingsHistoryPage from "./Pages/BiddingsHistoryPage.tsx";
import AboutPage from "./Pages/AboutPage.tsx";
import ProductPage from "./Pages/ProductPage.tsx";
import CreatePost from "./Pages/CreatePost.tsx";


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
                element: (
                    <OngoingPage/>
                ),
            },
            {
                path: "/trending",
                element: (
                        <TrendingPage />
                ),
            },
            {
                path: "/biddingshistory",
                element: (
                        <BiddingsHistoryPage/>
                ),
            },
            {
                path: "/about",
                element: <AboutPage/>,
            },
            {
                path: "/product",
                element: <ProductPage/>,
            },
            {
                path: "createPost",
                element: (
                        <CreatePost/>
                ),
            },

        ],
    }
];