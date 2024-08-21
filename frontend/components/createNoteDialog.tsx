"use client"

import { Dialog, DialogTitle } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import Input from "@/components/Input"
import { createNoteSchema, CreateNoteSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from './Button'

export default function CreateNoteDialog({ isOpen, setIsOpen }: any) {

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

    const router = useRouter()

    const { register, handleSubmit, formState:{isSubmitting} } = useForm<CreateNoteSchema>({
        resolver: zodResolver(createNoteSchema)
    })

    const mutation = useMutation({
        mutationFn: async (newNote: CreateNoteSchema & { userId: string }) => {
        return axios.post("http://localhost:5000/notes/upload", newNote, {withCredentials:true})
        },

        onSuccess: () => {
            toast.success("Notatka została stworzona")
            setIsOpen(false)
            window.location.reload()
        },
        onError: (error) => {
            toast.error("Coś poszło nie tak")
            console.log(error)
        }
    })

  const onSubmit = (data: CreateNoteSchema) => {
      if (!userId) {
        toast.error("User not logged in");
        return;
      }

        mutation.mutate({...data, userId})
    }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>
            <div className="fixed inset-0 flex items-center justify-center">
              <Dialog.Panel className=" space-y-4 rounded-xl bg-blue-400 max-w-[500px] flex flex-col items-center border-blue-600 border-b-8 min-h-[200px] min-w-[400px] p-6 shadow-2xl text-white transform transition-all">
                <div>
                  <DialogTitle className="font-bold text-2xl text-center">Create a new note</DialogTitle>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                  <div className="flex gap-4 mt-5">
                    <input className='w-[300px] rounded-xl border-b-4 active:border-0 placeholder:text-white placeholder:font-bold border-r-4 px-4 py-1 bg-blue-500 border-b-blue-700 border-r-blue-700' placeholder='title' type="text" {...register('title')} />
                  </div>
                    <Button name='Stwórz zadanie' className='bg-blue-500 border-b-blue-700 border-r-blue-700 w-[250px] mt-5' type="submit" disabled={isSubmitting}/>
                </form>
              </Dialog.Panel>
            </div>
        </Dialog>
      </Transition>
    </>
  )
}
