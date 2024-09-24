import Link from "next/link";
import React, { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

export default function Menu() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <React.Fragment>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`transition-transform duration-300 ease-in-out transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            >
                {isOpen ? (
                    <IoClose size={50} color='orange' />
                ) : (
                    <IoMenu size={50} color='orange' />
                )}
            </button>
            <div
                className={`absolute top-[6%] right-[2%] z-50 bg-white rounded-xl shadow-lg min-w-[200px] min-h-[60px] transition-transform duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
            >
                <div className="flex flex-col gap-2 w-full justify-center items-center py-5">
                    <Link href={"/post"} className="font-bold text-[#2f699b] hover:underline text-xl">Posts</Link>
                    <Link href={"/notes"} className="font-bold text-[#2f699b] hover:underline text-xl">Notes</Link>
                </div>
            </div>
        </React.Fragment>
    );
}
