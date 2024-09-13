"use client"

import React from 'react';
import { useUser } from './providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { logOut } from '@/lib/api';
import Link from 'next/link';

export default function Navbar() {
    const user = useUser()
    const router = useRouter()
    console.log(user)

    return (
        <div className='w-full flex justify-end items-center'>
            <div>
                <Link href={"/post"} className=' visible 2xl:hidden'>Stwórz zadanie</Link>
                <Link href={"/notes"}>Notatnik</Link>
            </div>
            <div className='flex flex-col mt-4 mr-36 gap-1 items-end'>
                <div className='flex gap-3'>
                    <h1 className='font-bold text-4xl text-[#4F9FE4]'>{user?.firstName}</h1>
                    <h1 className='font-bold text-4xl text-[#4F9FE4]'>{user?.lastName}</h1>
                </div>

                <button
                    className='font-bold text-xl hover:underline text-orange-secondary'
                    onClick={() => {
                        router.push('/user/login');
                        logOut()
                    }}>    
                    Log Out
                </button>
            </div>
        </div>
    ); 

}