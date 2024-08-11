
'use client'

import Input from "@/components/Input"
import { login } from "@/lib/api"
import { createLoginSchema, CreateLoginSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function LogIn() {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateLoginSchema>({
        resolver:zodResolver(createLoginSchema)
    });

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: login,
        onError: (error) => console.log(error),
        onSuccess: () => {
            toast.success("You have successfully registered.");
            router.push("/")
        }
    });

    const onSubmit = (data:CreateLoginSchema) => {
        mutation.mutate({...data});
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="email" placeholder='email' {...register("email")} />
                <Input type="password" placeholder='password' {...register("password")} />
                <button type="submit">Log in</button>
            </form> 
        </>
    );
}
