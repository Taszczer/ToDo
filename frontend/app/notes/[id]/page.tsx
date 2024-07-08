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

export default function NotesDetails({ params }: { params: { id: string | number } }) {

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
        content: '',
    })

    const router = useRouter()
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
        <div className='m-5'>
            <div className='flex gap-5'>
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
            <EditorContent className='tiptap-content max-w-96' editor={editor} />
            <div className='flex gap-7'>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => {
                    deleteNote(params.id)
                    router.push('/notes')
                }}>Delete</button>
            </div>
        </div>
    )
}
