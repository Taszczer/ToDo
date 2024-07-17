import React from 'react'

export default function Navbar() {
  
  return (
    <div className='absolute right-52 flex justify-end items-center'>
      <div className='flex gap-24 '>
          <button className='font-bold text-xl bg-blue-300 text-white px-6 py-2 rounded-md'>Log in</button>
          <button className='font-bold text-xl bg-orange-300 text-white px-6 py-2 rounded-md'>Sign in</button>
      </div>
    </div>
  )
}
