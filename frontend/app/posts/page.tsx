"use client"

import { Button } from "@/components/Button"
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
        <div className=" items-center flex flex-col justify-center">
            {data?.map((post) => (
                <div key={post._id} className="mt-4 rounded-lg border-0 text-white  border-b-8 border-r-8 border-orange-primary shadow-md shadow-orange-primary bg-[#F9C784] py-4 px-6 min-w-[250px] max-w-[250px] min-h-[300px]">
                    <div className="mb-[125px]">
                        <h2 className="font-bold text-xl capitalize">{post.title}</h2>
                        <p>{post.description}</p>
                    </div>
                    <p className="font-bold">autor: {post.author}</p>
                    {/* <p>{post.date}</p> */}
                    <Button
                        className="w-[200px]"
                        name="usuń quest"
                        onClick={() => {
                            deletePost(post._id);
                            window.location.reload()}
                        }
                    />
                </div>
            ))}
        </div>
    )
}