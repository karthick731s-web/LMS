import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token") || "";
    const userRole = localStorage.getItem("role") || "";

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Role mismatch — send to correct dashboard
        if (userRole === "instructor" || userRole === "admin") {
            return <Navigate to="/instructor-dashboard" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
