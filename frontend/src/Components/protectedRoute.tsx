import { useLoginState } from "../Context/LoginContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { loggedIn } = useLoginState();

    if (!loggedIn) {
        return <Navigate to={`/authentication?redirectTo=${window.location.pathname}`} />;
    }

    return children;
}
//TODO: implementering af adgang baseret på roller kan ske her