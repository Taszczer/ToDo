import { z } from "zod";

export type User = {
    _id: string
    firstName: string
    lastName: string
    email: string
    password:string
}

export type Post = {
    _id: string | number
    title: string | number
    description: string
    start_time: string
    end_time:string
}

export type TNote = {
    _id: string | number
    title: string | number
    descriptionText: string | number
}

export const createSchema = z.object({
    title: z.string().min(2, { message: "Zbyt krótki tytuł!" }).max(35, { message: "Zbyt długi tytuł, musisz go skrócić" }),
    description: z.string().min(2, { message: "Zbyt krótki opis!" }).max(4000, { message: "Zbyt długi opis, musisz go skrócić" }),
    start_time: z.string(),
    end_time:z.string()
})

export const createNoteSchema = z.object({
    title: z.string().min(2, { message: "Zbyt krótki tytuł!" }).max(35, { message: "Zbyt długi tytuł, musisz go skrócić" }),
})

export const createSigninSchema = z.object({
    firstName: z.string().min(1, {message: "This field has to be filled."}).max(30, {message: "FirstName must be shorter than 30 characters."}),
    lastName:z.string().min(1, {message: "This field has to be filled."}).max(30, {message: "LastName must be shorter than 30 characters."}),
    email:z.string().min(1, {message: "This field has to be filled."}).email("This is not a valid email."),
    password:z.string().min(4, {message: "Password must be longer than 4 characters"})
})

export const createLoginSchema = z.object({
    email:z.string().min(1, {message: "This field has to be filled."}).email("This is not a valid email."),
    password:z.string().min(4, {message: "Password must be longer than 4 characters"})
})

export type CreateSchema = z.infer<typeof createSchema>
export type CreateNoteSchema = z.infer<typeof createNoteSchema>
export type CreateSigninSchema = z.infer<typeof createSigninSchema>
export type CreateLoginSchema = z.infer<typeof createLoginSchema>