import React from 'react'
import {FiTrash2} from "react-icons/fi";
const BASE_URL = import.meta.env.VITE_API_URL
export default function LinkList({links,onDelete}) {

    return (
        <div className={"bg-white shadow-md rounded-lg p-6"}>
            <h2 className={"font-xl font-semibold mb-4 text-gray-700"}>Links</h2>
            {links.length === 0?(
                <p className={"text-gray-500"}>No links created, go make some</p>
            ):(
                <ul className={"space-y-4"}>
                    {links.map((link) => (
                        <li
                            key={link.id}
                            className={"border border-grey-200 rounded-md p-4 flex justify-between"}

                        >
                            <div className={"space-y-1"}>
                                <p className={"text-sm text-gray-500 break-all"}>
                                    Original:{" "}
                                    <a href={link.long_url}>
                                        {link.long_url}
                                    </a>
                                </p>

                                <p>
                                    Short:{" "}
                                    <a
                                        href={`${BASE_URL}/${link.short_url}`}
                                        target={"_blank"}
                                        rel="noopener noreferrer"
                                        className={"text-black font-medium hover:underline break-all"}
                                    >
                                        {BASE_URL}/{link.short_url}
                                    </a>

                                </p>
                                <p>Clicks: {link.click_count}</p>
                            </div>
                            <button
                                onClick={() => onDelete(link.short_url)}
                                className="text-black hover:text-gray-400 transition"
                            >
                                <FiTrash2 size={18}/>
                            </button>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
