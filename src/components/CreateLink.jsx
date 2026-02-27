import {useState} from 'react'

function  createLink({onCreate,loading}){
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(url);
        setUrl("");
    }

    return (
        <div className={"bg-white shadow-md rounded-lg p-6"}>
            <h2 className={"text-xl font-semibold mb-4 text-gray-700"}>Create New Link</h2>
            <form onSubmit={handleSubmit} className={"flex gap-3"}>
                <input
                    className={"w-full flex-1 border border-grey-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900" }
                    type={"url"}
                    placeholder= "enter url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}

                />
                <button
                    className={"bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition disabled:opacity-50"}
                    type={"submit"} disabled={loading} >
                    {loading? "Creating link..." : "Shorten"}
                </button>
            </form>
        </div>
    )
}

export default createLink;