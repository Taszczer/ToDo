"use client"


import axios from "axios";
import { CreateLoginSchema, CreateSigninSchema, LogInSchema, User } from "./types";

// axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

export async function deletePost(id:any) {
    await axios.delete(`http://localhost:5000/delete/${id}`)
}

export async function deleteNote(id: any) {
    await axios.delete(`http://localhost:5000/notes/delete/${id}`)
}

export async function login(body: CreateLoginSchema){
    const res = await axios.post("http://localhost:5000/login", body);
    localStorage.setItem('token', res.data.token)
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