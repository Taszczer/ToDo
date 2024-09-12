'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from "@/components/Calendar";
import CreatePost from "@/components/PostCreate";
import NoteBook from "./notes/page";
import Navbar from '@/components/Navbar';
import { useUser } from '@/components/providers/AuthProvider';
import LogIn from './user/login/page';

export default function Home() {
  const user = useUser();
  const router = useRouter();

  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);
  
  if (!user) {
    router.replace("/user/login");
    return null;
  }

  return (
    <main className='h-full'>
      <div className="max-w-[100%]">
        <Navbar />
        <div className='flex justify-between'>
          <div className="mt-12 ml-10 ">
            <Calendar />
          </div>
          <div className='flex flex-col justify-between items-end mr-36'>
            <div className="max-w-[375px] max-h-[425px] border-4 border-orange-secondary py-6 px-2 rounded-xl mt-28  ">
              <CreatePost />
            </div>
            <div className=" min-w-[500px]">
              <NoteBook />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
