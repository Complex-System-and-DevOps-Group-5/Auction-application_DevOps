import {RouteObject, Navigate} from "react-router-dom";
import App from "./App.tsx";
import AuthPage from "./Pages/AuthPage.tsx";
import {HomePage} from "./Pages/HomePage.tsx";
import OngoingPage from "./Pages/OngoingPage.tsx";
import TrendingPage from "./Pages/TrendingPage.tsx";
import BiddingsHistoryPage from "./Pages/BiddingsHistoryPage.tsx";
import AboutPage from "./Pages/AboutPage.tsx";
import ProductPage from "./Pages/ProductPage.tsx";
import CreatePost from "./Pages/CreatePost.tsx";
import { useLoginState } from "./Context/LoginContext.tsx"



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
                path: "/login",
                element: <AuthPage/>,
            },
            {
                path: "/ongoing",
                element: (
                    <ProtectedRoute>
                        <OngoingPage/>
                </ProtectedRoute>),
            },
            {
                path: "/trending",
                element: <TrendingPage/>,
            },
            {
                path: "/biddingshistory",
                element: (
                    <ProtectedRoute>
                         <BiddingsHistoryPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/about",
                element: <AboutPage/>,
            },
            {
                path: "/product/:id",
                element: <ProductPage />,
            },
            {
                path: "create-post",
                element: (
                    <ProtectedRoute>
                         <CreatePost/>
                    </ProtectedRoute>
                ),
            },

        ],
    }
];

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const {loggedIn} = useLoginState();
    return loggedIn ? children : <Navigate to="/login" />;
}