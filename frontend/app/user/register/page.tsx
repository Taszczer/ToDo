
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
import Image from 'next/image'
import { MdOutlineEmail } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import Link from 'next/link'
import { IoPeopleCircle } from "react-icons/io5";
import { IoPeopleCircleOutline } from "react-icons/io5";

export default function SignIn() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateSigninSchema>({
        resolver:zodResolver(createSigninSchema)
    });

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: signIn,
        onError: (error) => console.log(error),
        onSuccess: () => {
            router.push("/")
        }
    });

    const onSubmit = (data:CreateSigninSchema) => {
        mutation.mutate({...data});
    };

    return (
        <>
            <div className=" flex items-center justify-center bg-[#EBE9D8] h-full">
                <div className=" flex items-center justify-between bg-white w-[50%] h-[65%] rounded-[35px]">

                    <div className=" flex flex-col items-center w-[60%] h-[600px]">
                        <h1 className=" font-bold text-5xl text-[#1D1F1C] mb-12 ">Sign Up</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-row gap-3'>
                                <div className="relative flex items-center">
                                    <IoPeopleCircle size={30} color='white' className="absolute ml-3 mt-2.5" />
                                    <div className="h-[30px] rounded-3xl w-[3px] absolute bg-white ml-[52.5px] mt-2.5"></div>
                                    <Input className=" w-[200px] h-[40px] pl-16 mb-4 text-white bg-[#4F9FE4] border-r-[#266aa5] border-b-[#266aa5]"  label='First name' type='text' placeholder='first name' {...register("firstName")} />
                                </div>

                                <div className='relative flex items-center'>
                                    <IoPeopleCircleOutline size={30} color='white' className='absolute ml-3 mt-2.5' />
                                    <div className="h-[30px] rounded-3xl w-[3px] absolute bg-white ml-[52.5px] mt-2.5"></div>
                                    <Input className="w-[200px] h-[40px] pl-16 mb-4 text-white bg-[#4F9FE4] border-r-[#266aa5] border-b-[#266aa5]" label='Last name' type='text' placeholder='last name' {...register("lastName")} />
                                </div>
            
                            </div>
                            <div className="relative flex items-center">
                                <MdOutlineEmail size={30} color="white" className="absolute ml-3 mt-2.5" />
                                <div className="h-[30px] rounded-3xl w-[3px] absolute bg-white ml-[52.5px] mt-2.5"></div>
                                <Input className="w-[411px] h-[40px] mb-4 pl-16 text-white bg-[#4F9FE4] border-r-[#266aa5] border-b-[#266aa5]" label="Email" type="email" placeholder='email' {...register("email")} />
                            </div>

                            <div className="relative flex items-center">
                                <FaEye size={30} color="white" className="absolute ml-3 mt-2.5" />
                                <div className="h-[30px] rounded-3xl w-[3px] absolute bg-white ml-[52.5px] mt-2.5"></div>
                                <Input className="w-[411px] h-[40px] mb-4 pl-16 text-white bg-[#4F9FE4] border-r-[#266aa5] border-b-[#266aa5]" label="Password" type="password" placeholder='password' {...register("password")} />
                            </div>

                            <div className="px-6">
                                <button className="bg-[#266aa5] h-[50px] mt-5 rounded-xl w-full text-white font-bold text-xl" type="submit">Sign up</button>
                            </div> 
                        </form>
                        <p className="mt-36 text-md text-[#1D1F1C] font-semibold">Are you have an account? <Link href={"/"} className=" font-normal underline text-[#3a3d38] ">Log In here</Link></p>
                    </div>

                    <div className=" w-[40%] h-[80%] relative mr-10">
                        <Image src={"/signUp.jpg"} alt="keep on" layout="fill" objectFit="cover" className=" mr-10 rounded-3xl" />
                    </div>
                </div>
            </div>    
        </>
    );
}
