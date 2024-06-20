import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Posts() {
    const { isPending, data } = useQuery({
        queryKey: ['todos'],
        queryFn: () => axios.get('http://localhost:5000/posts')
    })

    if (isPending) {
        <p>Loading...</p>
    }
    return (
        <div>

        </div>
    )
}