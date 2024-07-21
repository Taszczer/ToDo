import React from 'react';
import { useUser } from './providers/AuthProvider';
import Link from 'next/link';

export default function Navbar() {
    const user = useUser();

    if (user) {
        return (
            <div className='absolute right-52 flex justify-end items-center'>
                <div className='flex gap-24'>
                    <Link href='/user/login' className='font-bold text-xl bg-blue-300 text-white px-6 py-2 rounded-md'>Log in</Link>
                    <Link href='/user/register' className='font-bold text-xl bg-orange-300 text-white px-6 py-2 rounded-md'>Sign in</Link>
                </div>
            </div>
        );
    } else {
      return <p className='absolute right-10 text-black'>{ user.user?.firstName }</p>; // Display logged-in state
    }
}
