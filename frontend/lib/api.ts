"use client"


import axios from "axios";
import { LogInSchema, User } from "./types";


export async function deletePost(id:any) {
    await axios.delete(`http://localhost:5000/delete/${id}`)
}

export async function deleteNote(id: any) {
    await axios.delete(`http://localhost:5000/notes/delete/${id}`)
}

export async function login(body: LogInSchema): Promise<User | null> {
    await axios.post("http://localhost:5000/login", body);
    return await whoAmI();
}

export async function whoAmI(): Promise<User | null> {
    try {
      return (await axios.get<User>("http://localhost:5000/whoami")).data;
    } catch (error) {
      console.log(error)
      return null
    }
}
  
export async function resumeSession(): Promise<User | null> {
    return await whoAmI();
}