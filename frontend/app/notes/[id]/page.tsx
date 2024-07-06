'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Bold from '@tiptap/extension-bold'
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

    let forBold = 2

    const editor = useEditor({
        extensions: [StarterKit, Bold],
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
        <div className=' m-5'>
            <div className='flex gap-5'>
                <button
                    onClick={() => {
                        if (forBold % 2 === 0) {
                            editor?.chain().focus().toggleBold().run()
                            forBold += 1
                        } else {
                            editor?.chain().focus().setBold().run()
                            forBold += 1
                        }
                        
                    }}
                    className={editor?.isActive('bold') ? 'is-active' : ''}
                >
                    B
                </button>
            </div>
            <EditorContent editor={editor} />
            <div className='flex gap-7'>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => {
                    deleteNote(params.id)
                    router.push('/notes')
                }}>Delate</button>
            </div>
        </div>
    )
}
