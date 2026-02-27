import { useState } from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            navigate("/");
        } catch (err) {
            console.log(err);
            alert("Login failed");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="space-y-4 w-80">
                <h2 className="text-2xl font-bold">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-gray-800 text-white p-2 rounded-md">
                    Login
                </button>
            </form>

                <Link to="/register" className={"flex items-center justify-center m-2 p-2"}>
                    Sign Up?
                </Link>

        </div>
    );
}

export default Login;