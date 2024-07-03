'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useCallback } from 'react'
import { toast } from 'sonner'

export default function NotesDetails({ params }: { params: { id: string | number } }) {
    const router = useRouter()
    const { data, error, isLoading } = useQuery({
        queryKey: ['noteId'],
        queryFn: async () => {
            return (await axios.get(`http://localhost:5000/notes/${params.id}`)).data
        }
    })

    const editor = useEditor({
        extensions: [StarterKit],
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

    if (error) {
        return <div>Error loading note</div>
    }

    return (
        <div>
            <EditorContent editor={editor} />
            <button onClick={handleSave}>Save</button>
        </div>
    )
}
