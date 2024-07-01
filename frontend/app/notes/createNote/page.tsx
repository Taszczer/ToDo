'use client'

import Input from "@/components/Input"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export default function CreateNote() {
//add type for mutation
    const mutation = useMutation({
        mutationFn: async (newNote: any) => {
            return axios.post("http://localhost:5000/notes/upload", newNote)
        },

        onSuccess: () => {
            toast.success("Notatka została stworzona")
            window.location.reload()
        },
        onError: (error) => {
            toast.error("Coś poszło nie tak")
            console.log(error)
        }
    })
//create type for data
    const onSubmit = (data:any) => {
        mutation.mutate({...data})
    }

    return (
        <div>
            <h1>+</h1>
            <form onSubmit={onSubmit}>
                <Input type="text"/>
            </form>
        </div>
    )
}