import axios from 'axios';

export function setUpAPI(){
    console.log("Creating Axios instance...");
    const api = axios.create({
        baseURL: 'http://localhost:3111',
    });
    console.log("Axios instance created:", api);
    return api;
}