'use client'

import { createSchema, CreateSchema } from '@/lib/types';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Input from '@/components/Input';
import { Button } from '@/components/Button';

export default function CreatePost() {
  const router = useRouter();

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateSchema>({
    resolver: zodResolver(createSchema)
  });

  const mutation = useMutation({
    mutationFn: (newToDo: CreateSchema) => {
      return axios.post('http://localhost:5000/posts/create', newToDo);
    },
    onSuccess: () => {
      toast.success('Zadanie zostało stworzone');
      router.push('/posts');
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
        <div className='gap-5'>
          <Input className=' ' placeholder='tytuł' type="text" {...register("title")} />
          <Input className='mt-2 placeholder:text-white h-[65px]' placeholder='opis' type="text" {...register("description")} />
          <Input className=' mt-2' placeholder='autor' type="text" {...register("author")} />
          <Button name='Stwórz zadanie' className=' ' type="submit" disabled={isSubmitting}/>
        </div>
      </form>
    </div>
  );
}