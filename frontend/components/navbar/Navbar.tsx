"use client"

import React from 'react';
import { useUser } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { logOut } from '@/lib/api';
import Link from 'next/link';
import { IoMenu } from "react-icons/io5";
import Menu from './Menu';

export default function Navbar() {
    const user = useUser()
    const router = useRouter()
    console.log(user)

    return (
        <div className='w-full flex justify-end items-center'>
            <div className='visible flex items-center justify-center h-[88px] md:hidden'>
             <Menu />
            </div>
            <div className='flex gap-5 mr-6'>
                <Link href={"/post"} className='hidden md:block 2xl:hidden font-bold text-xl text-[#2f699b] hover:underline transition-all'>Stwórz zadanie</Link>
                <Link href={"/notes"} className='hidden md:block 2xl:hidden font-bold text-xl text-[#2f699b] hover:underline transition-transform'>Notatnik</Link>
            </div>
            <div className='md:flex md:flex-col mt-4 mr-12 xl:mr-36 gap-1 hidden md:visible items-end'>
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