import axios from "axios";
import { User } from "./types";


export async function deletePost(id:any) {
    await axios.delete(`http://localhost:5000/delete/${id}`)
}

export async function deleteNote(id: any) {
    await axios.delete(`http://localhost:5000/notes/delete/${id}`)
}

export async function whoAmI(): Promise<User | null> {
    try {
        return(await axios.get("http://localhost:5000/whoAmI")).data
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function resumeSession(): Promise<User | null> {
    return await whoAmI();
}