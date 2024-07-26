"use client"


import axios from "axios";
import { CreateLoginSchema, CreateSigninSchema, LogInSchema, User } from "./types";

// axios.defaults.withCredentials = true


export async function deletePost(id:any) {
    await axios.delete(`http://localhost:5000/delete/${id}`)
}

export async function deleteNote(id: any) {
    await axios.delete(`http://localhost:5000/notes/delete/${id}`)
}

// export async function login(body: CreateLoginSchema): Promise<User | null> {
//     await axios.post("http://localhost:5000/login", body);
//     return await whoAmI();
// }

// export async function singIn(body:CreateSigninSchema): Promise<User | null> {
//     return await axios.post("http://localhost:5000/register", body)
// }

// export async function whoAmI(): Promise<User | null> {
//     try {
//         const response = await axios.get<User>('http://localhost:5000/whoami');
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }
  
// export async function resumeSession(): Promise<User | null> {
//     return await whoAmI();
// }

export const signIn= async (body:CreateSigninSchema): Promise<User | null> => {
    try {
      const response = await axios.post('http://localhost:5000/register', body);
      return response.data;
    } catch (error:any) {
      throw error.response.data;
    }
  };
  
  // Login function
  export const login = async (body: CreateLoginSchema): Promise<User | null> => {
    try {
      await axios.post('http://localhost:5000/login', body);
      return await whoAmI()
    } catch (error:any) {
      throw error.response.data;
    }
  };
  
  // Refresh token function
  export const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/refresh');
      return response.data;
    } catch (error:any) {
      throw error.response.data;
    }
  };
  
  // Get user info function
  export const whoAmI = async () => {
    try {
        const response = await axios.get('http://localhost:5000/whoami');
        console.log(response.data)
      return response.data;
    } catch (error:any) {
      throw error.response.data;
    }
  };