import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import{useAuth} from "../context/AuthContext.jsx";
import { createShortLink, getAllLinks, deleteLink } from "../services/api.js";
import CreateLink from "../components/CreateLink.jsx";
import LinkList from "../components/LinkList.jsx";

function Home() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user,logout}= useAuth();

    const fetchLinks = async () => {
        try {
            const data = await getAllLinks();
            setLinks(data);
        } catch (err) {
            console.log(err);
            // If token invalid → redirect to login
            if (err.response?.status === 401) {
                handleLogout();
            }
        }
    };

    useEffect(() => {
        fetchLinks();
    }, [user]);

    const handleCreate = async (url) => {
        setLoading(true);
        try {
            await createShortLink(url);
            await fetchLinks();
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const handleDelete = async (short_code) => {
        try {
            await deleteLink(short_code);
            setLinks((prev) =>
                prev.filter((link) => link.short_url !== short_code)
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        logout()
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex justify-center py-10 px-4 bg-gray-50">
            <div className="w-full max-w-2xl space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        URL Shortener
                    </h1>



                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

                {/* Create Link Form */}
                <CreateLink
                    onCreate={handleCreate}
                    loading={loading}
                />

                {/* Links List */}
                <LinkList
                    links={links}
                    onDelete={handleDelete}
                />

            </div>
        </div>
    );
}

export default Home;