'use client'

import { createSchema, CreateSchema } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
// import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CreatePost() {
  // const router = useRouter();

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateSchema>({
    resolver: zodResolver(createSchema)
  });

  const mutation = useMutation({
    mutationFn: (newToDo: CreateSchema) => {
      return axios.post('http://localhost:5000/posts', newToDo);
    },
    onSuccess: () => {
      toast.success('Zadanie zostało stworzone');
      // router.push('/');
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col '>
        <div className=' w-[400px] gap-5'>
        <input className=' bg-slate-400' type="text" {...register("title")} />
        <input className=' bg-slate-400' type="text" {...register("description")} />
        <input className=' bg-slate-400' type="text" {...register("author")} />
        <button className=' bg-slate-400' type="submit" disabled={isSubmitting}>Create Post</button>
        </div>
      </form>
    </div>
  );
}