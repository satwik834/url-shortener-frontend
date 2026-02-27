import { useState } from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {register} = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert("Registration failed");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="space-y-4 w-80">
                <h2 className="text-2xl font-bold">Register</h2>
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
                <button className="w-full bg-gray-900 rounded-md text-white p-2 hover:bg-gray-700 transition focus:outline-none">
                    Register
                </button>

            </form>
            <Link to={`/Login`}  className={"m-2 p-2"}>
                Already have an Account?
            </Link>

        </div>
    );
}

export default Register;