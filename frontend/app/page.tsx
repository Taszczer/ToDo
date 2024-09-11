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
        <div className="mt-12 ml-10 max-w-[70%]">
          <Calendar />
        </div>
        <div className="absolute top-[60%] 2xl:top-[90%] right-32 border-4 border-orange-secondary py-6 px-2 rounded-xl">
          <CreatePost />
        </div>
        <div className="absolute xl:top-32 xl:right-32 2xl:left-32 2xl:top-[90%] min-w-[500px]">
          <NoteBook />
        </div>
      </div>
    </main>
  );
}
