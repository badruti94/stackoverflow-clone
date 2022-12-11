import axios from "axios";

export const API = axios.create({
    // baseURL: "http://localhost:3000/",
    baseURL: "https://simple-stackoverflow-clone-be.vercel.app/",
});

export const getConfig = async () => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    };

    return config
}