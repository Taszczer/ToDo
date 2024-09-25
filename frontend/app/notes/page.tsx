'use client'

import CreateNoteDialog from "@/components/createNoteDialog"
import { TNote } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"


export default function NoteBook() {

    const [isOpen, setIsOpen] = useState(false)

    const { data, isLoading, error } = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const res = await axios.get<TNote[]>("http://localhost:5000/notes", { withCredentials: true })
            return res.data
        }
    })

    if (error) {
        return <p>Something went wrong</p>
    }

    return (
        <div className=" max-w-[500px]">
            <div className="mt-3 border-4 rounded-3xl border-blue-600 px-5 py-3 flex flex-col">
                <h1 className="text-xl font-bold text-blue-400">Your notes</h1>
                <div className="max-h-[400px] overflow-y-auto">
                    {data?.map((note) => (
                        <Link href={`/notes/${note._id}`}>
                            <div key={note._id} className="mt-3 border-2 border-blue-400 p-2 px-4 rounded-2xl">
                                <h1 className="font-bold text-blue-500 capitalize">{note.title}</h1>
                            </div>
                        </Link>
                    ))}
                </div>
                <button onClick={() => { setIsOpen(true) }} className="mt-2 flex items-center justify-center"><p className=" border-blue-600 border-r-4 border-b-4 bg-blue-400 text-white w-[50px] h-[50px] rounded-full font-bold text-xl flex justify-center items-center">+</p></button>
                <CreateNoteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    )
}
