"use client"


import axios from "axios";
import { CreateLoginSchema, CreateSigninSchema, LogInSchema, User } from "./types";

// axios.defaults.withCredentials = true
const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // Necessary for sending cookies with requests
  });
  
  // Axios request interceptor to automatically attach the token to headers
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Axios response interceptor for handling expired tokens
//   api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const newTokens = await refreshTokens();
//         if (newTokens) {
//           localStorage.setItem("accessToken", newTokens.accessToken);
//           api.defaults.headers.common["Authorization"] = `Bearer ${newTokens.accessToken}`;
//           return api(originalRequest);
//         } else {
//           localStorage.removeItem("accessToken");
//           window.location.href = "/login"; // Redirect to login
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
  

export async function deletePost(id:any) {
    await axios.delete(`http://localhost:5000/delete/${id}`)
}

export async function deleteNote(id: any) {
    await axios.delete(`http://localhost:5000/notes/delete/${id}`)
}

export async function login(body: CreateLoginSchema){
    await axios.post("http://localhost:5000/login", body);
    //localStorage.setItem('token', res.data.token)
    return await whoAmI();
}

export async function signIn(body:CreateSigninSchema): Promise<User | null> {
    return await axios.post("http://localhost:5000/register", body)
}

export async function whoAmI(): Promise<User | null> {
    try {
      const response = await axios.get<User>('http://localhost:5000/whoami');
      console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
  
export async function resumeSession(): Promise<User | null> {
    return await whoAmI();
}