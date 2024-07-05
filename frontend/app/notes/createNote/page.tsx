'use client'

import { Button } from "@/components/Button"
import Input from "@/components/Input"
import { createNoteSchema, CreateNoteSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function CreateNote() {

    const router = useRouter()

    const { register, handleSubmit, formState:{isSubmitting} } = useForm<CreateNoteSchema>({
        resolver: zodResolver(createNoteSchema)
    })

    const mutation = useMutation({
        mutationFn: async (newNote: CreateNoteSchema) => {
            return axios.post("http://localhost:5000/notes/upload", newNote)
        },

        onSuccess: () => {
            toast.success("Notatka została stworzona")
            router.push("/")
        },
        onError: (error) => {
            toast.error("Coś poszło nie tak")
            console.log(error)
        }
    })

    const onSubmit = (data:CreateNoteSchema) => {
        mutation.mutate({...data})
    }

    return (
        <div>
            <h1>+</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" {...register('title')} />
                <Input type="text" {...register('descriptionText')} />
                <Button name='Stwórz zadanie' className=' w-[250px] mt-5' type="submit" disabled={isSubmitting}/>
            </form>
        </div>
    )
}