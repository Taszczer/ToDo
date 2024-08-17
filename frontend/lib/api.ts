"use client";

import axios from "axios";
import { CreateLoginSchema, CreateSigninSchema } from "./types";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const API_BASE_URL = "http://localhost:5000";

axios.interceptors.request.use((config) => {
    const token = cookies.get('jwt_authorization') || localStorage.getItem('jwt_authorization');
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
        const response = await axios.post(`${API_BASE_URL}/login`, body);
        console.log('API Response:', response.data);
        
        cookies.set("jwt_authorization", response.data.token, { path: '/' });

        await whoAmI(); 
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function signIn(body: CreateSigninSchema) {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, body);
        return response.data;
    } catch (error) {
        console.error("Sign-in error:", error);
        throw error;
    }
}

export async function whoAmI() {
    try {
        const response = await axios.get(`${API_BASE_URL}/whoami`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${cookies.get('jwt_authorization')}`
            }
        });
        
        console.log("whoAmI response:", response.data);
        return response.data;
    } catch (error) {
        console.error("WhoAmI error:", error);
        return null;
    }
}

export async function resumeSession() {
    return await whoAmI();
}
