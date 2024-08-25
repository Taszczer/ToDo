
'use client'

import Input from "@/components/Input"
import { login } from "@/lib/api"
import { createLoginSchema, CreateLoginSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { MdOutlineEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";

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
            <div className=" flex items-center justify-center bg-[#EEE5DE] h-full">
                <div className=" flex items-center justify-between bg-white w-[50%] h-[65%] rounded-[35px]">
                    <div className="h-[700px] w-[1200px] relative mr-10">
                        <Image src={"/logInImage.jpg"} alt="keep on" layout="fill" objectFit="cover" className=" ml-10 rounded-3xl" />
                    </div>

                    <div className=" flex flex-col items-center w-full mx-28 h-[500px]">
                        <h1 className=" font-bold text-5xl text-[#1D1F1C] mb-12 ">Login</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative flex items-center">
                                <MdOutlineEmail size={30} color="white" className="absolute ml-3 mt-2.5" />
                                <div className="h-[30px] rounded-3xl w-[3px] absolute bg-white ml-[52.5px] mt-2.5"></div>
                                <Input className="w-[400px] h-[40px] mb-4 pl-16 text-white" label="Email" type="email" placeholder='email' {...register("email")} />
                            </div>

                            <div className="relative flex items-center">
                                <FaEye size={30} color="white" className="absolute ml-3 mt-2.5" />
                                <div className="h-[30px] rounded-3xl w-[3px] absolute bg-white ml-[52.5px] mt-2.5"></div>
                                <Input className="w-[400px] h-[40px] mb-4 pl-16 text-white" label="Password" type="password" placeholder='password' {...register("password")} />
                            </div>

                            <div className="px-6">
                                <button className="bg-[#dd955e] h-[50px] mt-5 rounded-xl w-full text-white font-bold text-xl" type="submit">Log in</button>
                            </div> 
                        </form>
                        <p className="mt-36 text-md text-[#1D1F1C] font-semibold">Don't have an account? <Link href={"/user/register"} className=" font-normal underline text-[#3a3d38] ">Sign Up here</Link></p>
                    </div>
                </div>
            </div>    
        </>
    );
}
