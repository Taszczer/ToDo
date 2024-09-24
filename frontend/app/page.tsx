'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from "@/components/Calendar";
import CreatePost from "@/components/PostCreate";
import NoteBook from "./notes/page";
import Navbar from '@/components/navbar/Navbar';
import { useUser } from '@/components/providers/AuthProvider';

export default function Home() {
  const user = useUser();
  const router = useRouter();

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
    <main className='h-screen overflow-y-auto'>
      <div className="max-w-[100%]">
        <Navbar />
        <div className='flex flex-col 2xl:flex-row justify-between h-full'>
          <div className="2xl:ml-10 w-full 2xl:w-auto h-full max-h-screen overflow-y-auto">
            <Calendar />
          </div>
  
          <div className='hidden 2xl:flex 2xl:flex-col justify-between items-center max-w-[100%] 2xl:items-end my-28 ml-11 mr-32'>
            <div className="max-w-[375px] max-h-[425px] border-4 border-orange-secondary py-6 px-2 rounded-xl mt-28">
              <CreatePost />
            </div>
            <div className="min-w-[500px]">
              <NoteBook />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
