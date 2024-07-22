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
//     await axios.post("http://localhost:5000/login", body, { withCredentials: true });
//     return await whoAmI();
// }

// export async function singIn(body:CreateSigninSchema): Promise<User | null> {
//     return await axios.post("http://localhost:5000/register", body, {
//         // withCredentials:true,
//         headers: { "Content-Type": "multipart/form-data" },
//     })
// }

// export async function whoAmI(): Promise<User | null> {
//     try {
//       return (await axios.get<User>("http://localhost:5000/whoami", { withCredentials: true })).data;
//     } catch (error) {
//       console.log(error)
//       return null
//     }
// }
  
// export async function resumeSession(): Promise<User | null> {
//     return await whoAmI();
// }