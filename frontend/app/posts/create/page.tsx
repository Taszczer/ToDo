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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("title")} />
        <input type="text" {...register("description")} />
        <input type="text" {...register("author")} />
        <button type="submit" disabled={isSubmitting}>Create Post</button>
      </form>
    </div>
  );
}
