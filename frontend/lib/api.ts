import axios from "axios";

export async function deletePost(id:any) {
    await axios.delete(`http://localhost:5000/delete/${id}`)
}