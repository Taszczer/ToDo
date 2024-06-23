import { z } from "zod";


export type Post = {
    _id: string | number
    title: string | number
    description: string
    author: string
    start_time: string
    end_time:string
}
export const createSchema = z.object({
    title: z.string().min(2, { message: "Zbyt krótki tytuł!" }).max(35, { message: "Zbyt długi tytuł, musisz go skrócić" }),
    description: z.string().min(2, { message: "Zbyt krótki opis!" }).max(4000, { message: "Zbyt długi opis, musisz go skrócić" }),
    author: z.string().min(2, { message: "Zbyt krótki imię!" }).max(40, { message: "Zbyt długie imię, musisz go skrócić" }),
    start_time: z.string(),
    end_time:z.string()
})

export type CreateSchema = z.infer<typeof createSchema>