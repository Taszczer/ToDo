'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Italic from '@tiptap/extension-italic'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import StarterKit from '@tiptap/starter-kit'
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { deleteNote } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function NotesDetails({ params }: { params: { id: string | number } }) {

    const router = useRouter()

    const { data, isLoading } = useQuery({
        queryKey: ['noteId'],
        queryFn: async () => {
            return (await axios.get(`http://localhost:5000/notes/${params.id}`)).data
        }
    })

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            BulletList,
            Underline,
            Strike,
            ListItem,
            Code.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
            }),
        ],
        editorProps: {
            attributes: {
                class:"max-w-[625px] max-h-[800px] overflow-y-auto min-w-[625px] min-h-[200px] focus:outline-none border-2 border-b-4 border-r-4 border-r-blue-400 border-b-blue-400 border-blue-200 rounded-xl py-2 px-5"
            }
        },
        content: '',
    })

    useEffect(() => {
        if (editor && data?.descriptionText) {
            editor.commands.setContent(data.descriptionText)
        }
    }, [editor, data])

    const saveNote = useMutation({
        mutationFn: async (updatedContent: string) => {
            await axios.put(`http://localhost:5000/notes/edit/${params.id}`, {
                title: data.title,
                descriptionText: updatedContent,
            })
        },
        onSuccess: () => {
            toast.success('Zmiany zostały wprowadzone')
            console.log('Zmiany zostały wprowadzone');
        },
        onError: (error) => {
            console.error('Coś poszło nie tak', error);
        }
    })

    const handleSave = useCallback(() => {
        if (editor) {
            const updatedContent = editor.getHTML()
            saveNote.mutate(updatedContent)
        }
    }, [editor, saveNote])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='m-5 flex flex-col items-center justify-center mt-[200px]'>
            <button className='flex justify-end items-center w-[625px] cursor-pointer mb-5 text-blue-600' onClick={() => { router.push('/') }}><IoIosCloseCircleOutline size={50}/></button>
            <div className='flex gap-5 px-5 py-2 border-2 border-r-4 border-b-4 mb-4 rounded-xl border-blue-200 border-r-blue-400 border-b-blue-400'>
                <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={editor?.isActive('bold') ? 'is-active' : ''}
                >
                    B
                </button>

                <button
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    className={editor?.isActive('code') ? 'is-active' : ''}
                >
                    {editor?.isActive('code') ? 'Unset code' : 'Set code'}
                </button>

                <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={editor?.isActive('italic') ? 'is-active' : ''}
                >
                    Set italic
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={editor?.isActive('bulletList') ? 'is-active' : ''}
                >
                    Toggle bullet list
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    className={editor?.isActive('code') ? 'is-active' : ''}
                >
                    Set underline
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    disabled={editor?.isActive('strike')}
                >
                    Set strike
                </button>
            </div>
            <EditorContent editor={editor} />
            <div className='flex gap-6 items-center justify-end w-[625px] mr-10 mt-2'>
                <button
                    onClick={handleSave}
                    className='bg-blue-400 border-r-2 border-b-2 border-blue-600 w-[100px] text-white  py-2 rounded-full'
                >
                    Save
                </button>
                <button
                    onClick={() => {
                        deleteNote(params.id)
                        router.push('/notes')
                    }}
                    className='bg-blue-400 border-r-2 border-b-2 w-[100px] border-blue-600 text-white  py-2 rounded-full'
                >Delete</button>
            </div>
        </div>
    )
}
