'use client'

import Input from '@/components/Input'
import { CreateSigninSchema, createSigninSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function SignIn() {
    
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateSigninSchema>({
        resolver:zodResolver(createSigninSchema)
    })

    const mutation = useMutation({
        mutationFn: async (data:CreateSigninSchema) => {
            return axios.post("http://localhost:5000/register", data, {
                headers: { "Content-Type": "multipart/form-data" },
              })
        }
    })

    const onSubmit = (data:CreateSigninSchema) => {
        mutation.mutate({...data})
    }
  return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
              <Input type="text"  placeholder='firstName' {...register("firstName")} />
              <Input type="text"  placeholder='lastName' {...register("lastName")} />
              <Input type="email" placeholder='email' {...register("email")} />
              <Input type="password" placeholder='password' {...register("password")} />
              <button disabled={isSubmitting}>Sign in</button>
        </form>
      </>
  )
}
