
'use client'

import Input from '@/components/Input'
import { signIn } from '@/lib/api'
import { CreateSigninSchema, createSigninSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation"
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function SignIn() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateSigninSchema>({
        resolver:zodResolver(createSigninSchema)
    });

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: signIn,
        onError: (error) => console.log(error),
        onSuccess: () => {
            toast.success("You have successfully registered.");
            router.push("/")
        }
    });

    const onSubmit = (data:CreateSigninSchema) => {
        mutation.mutate({...data});
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder='firstName' {...register("firstName")} />
                <Input type="text" placeholder='lastName' {...register("lastName")} />
                <Input type="email" placeholder='email' {...register("email")} />
                <Input type="password" placeholder='password' {...register("password")} />
                <button disabled={isSubmitting}>Sign in</button>
            </form>
        </>
    );
}
