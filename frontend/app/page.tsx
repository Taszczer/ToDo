'use client'

import { useEffect, useState } from 'react';
import Calendar from "@/components/Calendar";
import CreatePost from "@/components/PostCreate";
import NoteBook from "./notes/page";
import Navbar from '@/components/Navbar';

export default function Home() {
  const [loading, setLoading] = useState(true);

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
    <main>
      <div className="max-w-[70%]">
        <Navbar/>
        <div className="mt-12 ml-10">
          <Calendar />
        </div>
        <div className="absolute top-[50%] right-32 border-4 border-orange-secondary py-6 px-2 rounded-xl">
          <CreatePost />
        </div>
        <div className="absolute top-14 right-32 min-w-[500px]">
          <NoteBook />
        </div>
      </div>
    </main>
  );
}
