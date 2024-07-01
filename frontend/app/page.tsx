'use client'

import Calendar from "@/components/Calendar";
import CreatePost from "@/components/PostCreate";

export default function Home() {
  return (
    <main>
      <div className="max-w-[70%]">
        <div className="mt-12 ml-10">
          <Calendar />
        </div>
        <div className="absolute top-14 right-32 border-4 border-orange-secondary py-6 px-2 rounded-xl">
          <CreatePost/>
        </div>
      </div>
    </main>
  );
}
