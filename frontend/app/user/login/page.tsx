'use client'

import Input from "@/components/Input"
import { login, whoAmI } from "@/lib/api"
import { createLoginSchema, CreateLoginSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function LogIn() {

    const [first, setFirst] = useState(false)

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateLoginSchema>({
        resolver:zodResolver(createLoginSchema)
    })

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success("You have successfully logged in.")
            router.push("/")
            // whoAmI()
        },
        onError: () => {
            setFirst(true)
        }
    })

    const onSubmit = (data:CreateLoginSchema) => {
        mutation.mutate({...data})
    }
  return (
      <>
          <h1>{first ? "Invalid email or password. Please try again with the correct credentials." : "" }</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
              <Input type="email" placeholder='email' {...register("email")} />
              <Input type="password" placeholder='password' {...register("password")} />
              <button disabled={isSubmitting}>Log in</button>
          </form> 
    </>
  )
}
