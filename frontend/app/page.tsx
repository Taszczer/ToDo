'use client'

import { useEffect, useState } from 'react';
import Calendar from "@/components/Calendar";
import CreatePost from "@/components/PostCreate";
import NoteBook from "./notes/page";
import Navbar from '@/components/Navbar';
import { useUser } from '@/components/providers/AuthProvider';
import LogIn from './user/login/page';

export default function Home() {
  const [loading, setLoading] = useState(true);

  const user = useUser()
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <img src="/loader.gif" alt="afdadf" width={200} height={200} />
      </div>
    );
  }

  return (
    <main className='h-full'>
      {user ? 
        <div className="max-w-[100%]">
          <Navbar/>
          <div className="mt-12 ml-10 max-w-[70%]">
            <Calendar />
          </div>
          <div className="absolute top-[60%] right-32 border-4 border-orange-secondary py-6 px-2 rounded-xl">
            <CreatePost />
          </div>
          <div className="absolute top-32 right-32 min-w-[500px]">
            <NoteBook />
          </div>
        </div>
        :
        <LogIn />
      }
    </main>
  );
}
