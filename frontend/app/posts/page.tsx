"use client"

import { deletePost } from "@/lib/api"
import { Post } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Posts() {
    const { isLoading, data, error } = useQuery({
        queryKey: ['todo'],
        queryFn: async () => {
            const response = await axios.get<Post[]>('http://localhost:5000/posts')
            return response.data
        }
    })

    if (isLoading) {
        <p>Loading...</p>
    }

    if (error) {
        console.log(error)
    }

    return (
        <div>
            {data?.map((post) => (
                <div key={post._id} className="mt-4">
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>{post.author}</p>
                    {/* <p>{post.date}</p> */}
                    <button onClick={() => {
                        deletePost(post._id);
                        window.location.reload()
                    }}>
                        usuń quest
                    </button>
                </div>
            ))}
        </div>
    )
}