const BASE_URL = import.meta.env.VITE_API_URL


const authFetch = async (endpoint,options={}) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`,{
      ...options,
      headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          Authorization: token? `Bearer ${token}`: "",
      },
    });
    if(!res.ok){
        throw new Error("Request failed");
    }
    return res.json()
}


export const createShortLink = async (url) => {
    return authFetch('/shorten', {
        method: 'POST',
        body: JSON.stringify({long_url: url}),
    })
}

export const getAllLinks = async () => {
    return authFetch("/links",{
        method: "GET",
    })
}

export const deleteLink = async (short_code) => {
    return authFetch(`/${short_code}`,{
        method: "DELETE",
    });
};