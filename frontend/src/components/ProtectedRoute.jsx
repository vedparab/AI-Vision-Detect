import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;