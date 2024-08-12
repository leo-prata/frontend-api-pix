import axios from 'axios';

export function setUpAPI(){
    console.log("Creating Axios instance...");
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    });
    console.log("Axios instance created:", api);
    return api;
}