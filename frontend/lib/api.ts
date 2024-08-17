"use client";

import axios from "axios";
import { CreateLoginSchema, CreateSigninSchema, User } from "./types";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const API_BASE_URL = "http://localhost:5000";

axios.interceptors.request.use((config) => {
    const token = cookies.get('jwt_authorization')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export async function deletePost(id: any) {
    await axios.delete(`http://localhost:5000/delete/${id}`);
}

export async function deleteNote(id: any) {
    await axios.delete(`http://localhost:5000/notes/delete/${id}`);
}

export async function login(body: CreateLoginSchema) {
    try {
        const res = await axios.post(`${API_BASE_URL}/login`, body);
        
        cookies.set("jwt_authorization", res.data.token, { path: '/' });

        await whoAmI(); 
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function signIn(body: CreateSigninSchema) {
    try {
        const res = await axios.post(`${API_BASE_URL}/register`, body);
        return res.data;
    } catch (error) {
        console.error("Sign-in error:", error);
        throw error;
    }
}

export async function logOut() {
    try {
        await axios.delete(`http://localhost:5000/logout`, { withCredentials: true });
        console.log("done")
    } catch (err){
        console.log(err)
    }
}

export async function whoAmI():Promise<User | null> {
    try {
        const res = await axios.get(`${API_BASE_URL}/whoami`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${cookies.get('jwt_authorization')}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("WhoAmI error:", error);
        return null;
    }
}

export async function resumeSession() {
    return await whoAmI();
}
