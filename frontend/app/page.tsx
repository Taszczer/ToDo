'use client'

import { useEffect, useState } from 'react';
import Calendar from "@/components/Calendar";
import CreatePost from "@/components/PostCreate";
import NoteBook from "./notes/page";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="max-w-[70%]">
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
