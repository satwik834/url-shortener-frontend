import { Routes, Route,Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/login"
                element={
                    user ? <Navigate to="/" replace /> : <Login />
                }
            />

            <Route
                path="/register"
                element={
                    user ? <Navigate to="/" replace /> : <Register />
                }
            />
        </Routes>
    );
}

export default App;