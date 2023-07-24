import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {

    const { loading, isAuthenticated } = useAuth();
    console.log(loading, isAuthenticated);

    if (loading) {
        return <h1>Loading...</h1>
    }

    // Check if you are authenticated.
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
