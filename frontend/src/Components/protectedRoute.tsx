import { useLoginState } from "../Context/LoginContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { loggedIn } = useLoginState();

    if (!loggedIn) {
        return <Navigate to="/authentication" />;
    }

    return children;
}
