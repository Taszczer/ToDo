'use client'

import Calendar from "@/components/Calendar";
import CreatePost from "@/components/PostCreate";

export default function Home() {
  return (
    <main className="">
      {/* <p>kdafjkld</p> */}
      <div className="max-w-[70%]">
        <Calendar />
        <div className="absolute top-16 right-32">
          <CreatePost/>
        </div>
      </div>
    </main>
  );
}
