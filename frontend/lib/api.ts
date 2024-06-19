import axios from "axios";

export async function Test() {
    try {
        const res = await axios.get('http://localhost:5000/test');
        console.log(res.data);
    } catch (error) {
        console.log('Error:', error);
    }
} 

export async function createPost(data:any) {
    const res = await axios.post('http://localhost:5000/posts', {
        data
    })
    return res
}