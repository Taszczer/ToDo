'use client'

import { createSchema, CreateSchema } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import Input from './Input';

export default function CreatePost() {

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateSchema>({
    resolver: zodResolver(createSchema)
  });

  const mutation = useMutation({
    mutationFn: (newToDo: CreateSchema) => {
      return axios.post('http://localhost:5000/posts/create', newToDo);
    },
    onSuccess: () => {
      toast.success('Zadanie zostało stworzone');
      window.location.reload()
    },
    onError: (error) => {
      toast.error("Coś poszło nie tak");
      console.log(error);
    }
    
  });

  const onSubmit = (data: CreateSchema) => {
    mutation.mutate({ ...data });
  };
  

  return (
    <div className='flex flex-col items-center'>
        <h1 className='text-xl mb-4 text-orange-secondary font-bold'>Tutaj możesz zrobić nowego taska</h1>
        <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col items-center'>
            <div className='gap-5'>
              <Input className=' ' placeholder='tytuł' type="text" {...register("title")} />
              <textarea className='mt-2 h-[105px] w-full rounded-xl bg-orange-primary border-b-4 border-r-orange-secondary border-b-orange-secondary placeholder:text-white placeholder:font-bold border-r-4 px-4 py-1' placeholder='opis' {...register("description")} />
              <div>
                  <Input className=' mt-2 text-white font-bold' placeholder='autor' type="datetime-local" {...register("start_time")} />
                  <Input className=' mt-2 text-white font-bold' placeholder='autor' type="datetime-local" {...register("end_time")} />
              </div>
              <Button name='Stwórz zadanie' className=' w-[250px] mt-5' type="submit" disabled={isSubmitting}/>
            </div>
        </form>
    </div>
  );
}