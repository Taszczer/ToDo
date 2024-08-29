"use client"

import React from 'react';
import { useUser } from './providers/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logOut } from '@/lib/api';

export default function Navbar() {
    const user = useUser()
    const router = useRouter()

    console.log(user)

    return (
        <div className='absolute right-32 flex justify-end items-center'>
            <div className='flex flex-col gap-1 items-end'>
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