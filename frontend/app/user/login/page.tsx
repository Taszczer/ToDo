import Input from "@/components/Input"
import { createLoginSchema, CreateLoginSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import { useForm } from "react-hook-form"

export default function LogIn() {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateLoginSchema>({
        resolver:zodResolver(createLoginSchema)
    })

    const mutation = useMutation({
        mutationFn: async (data:CreateLoginSchema) => {
            return axios.post('http://localhost:5000/login', data)
        }
    })

    const onSubmit = (data:CreateLoginSchema) => {
        mutation.mutate({...data})
    }
  return (
    <>
          <form onSubmit={handleSubmit(onSubmit)}>
              <Input type="email" placeholder='email' {...register("email")} />
              <Input type="password" placeholder='password' {...register("password")} />
              <button disabled={isSubmitting}>Log in</button>
          </form> 
    </>
  )
}
