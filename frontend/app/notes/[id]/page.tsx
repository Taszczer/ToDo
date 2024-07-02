'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function NotesDetails({params}:{params:{id:string|number}}) {
    const { data, error, isLoading } = useQuery({
        queryKey: ['noteId'],
        queryFn: async () => {
            return (await axios.get(`http://localhost:5000/notes/${params.id}`)).data
        }
    })
    return (
        <div>
            <h1>{data?.title}</h1>
            <p>{data?.descriptionText}fsgs</p>
        </div>
    )
}