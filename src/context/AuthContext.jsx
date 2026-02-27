import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();
const BASE_URL = import.meta.env.VITE_API_URL
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(!token) {
            setLoading(false);
            return;
        }

        fetch(`${BASE_URL}/test/me`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                if(!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then(data => setUser(data))
            .catch(() => logout())
            .finally(() => setLoading(false));

    },[token]);
    const register = async(email,password) => {
        const res = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({email,password}),
        })
        const data = await res.json();
        if(!res.ok) throw new Error(data.detail);
        return data;
    }
    const login = async (email, password) => {
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data);
        }

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("email",email)
        setToken(data.access_token);
    };



    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setToken(null);
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ token,user,login,logout,register,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);