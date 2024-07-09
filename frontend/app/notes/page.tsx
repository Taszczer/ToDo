'use client'

import CreateNoteDialog from "@/components/createNoteDialog"
import { TNote } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"


export default function NoteBook() {

    const [isOpen, setIsOpen] = useState(false)

    const { data, isLoading, error } = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            return (await axios.get<TNote[]>("http://localhost:5000/notes")).data
        }
    })
    
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Something went wrong</p>
    }

    return (
        <div className=" max-w-[500px]">
            <div className="mt-3 border-4 rounded-3xl border-blue-600 px-5 py-3 flex flex-col">
                <h1 className="text-xl font-bold text-blue-400">Your notes</h1>
                <div className="max-h-[400px] overflow-y-auto">
                    {data?.map((note) => (
                        <Link href={`/notes/${note._id}`}>
                            <div key={note._id} className="mt-3 border-2 border-blue-400 p-2 px-4 rounded-2xl">
                                {/* <img src="" alt="" /> */}
                                <h1 className="font-bold text-blue-500 capitalize">{note.title}</h1>
                            </div>
                        </Link>
                    ))}
                </div>
                <button onClick={() => { setIsOpen(true) }} className="mt-2 flex items-center justify-center"><p className=" border-blue-600 border-r-4 border-b-4 bg-blue-400 text-white w-[50px] h-[50px] rounded-full font-bold text-xl flex justify-center items-center">+</p></button>
                <CreateNoteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    )
}














































































// 'use client'

// import Document from '@tiptap/extension-document'
// import { TiptapCollabProvider } from '@hocuspocus/provider'
// // import CollaborationHistory from '@tiptap-pro/extension-collaboration-history'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
// import { EditorContent, useEditor } from '@tiptap/react'
// import React, { useEffect } from 'react'
// import * as Y from 'yjs'


// // const doc = new Y.Doc()

// // useEffect(() => {
// //     const provider = new TiptapCollabProvider({
// //       name: note.id, // Document identifier
// //       appId: '/notes', // replace with YOUR_APP_ID from Cloud dashboard
// //       document: doc,
// //     })
// // }, [])
  
// const TiptapEditor = () => {
//   const editor = useEditor({
//     extensions: [
//       Document,
//       Paragraph,
//       Text,
//     ],
//     editorProps: {
//       attributes: {
//         class: 'text-green-500',
//       },
//     },
//     content: `
// 1dakljfklajdklfajklfjdaklfjkladjklfdaf adfafa dafdaf adfadf
//     `,
//   })

//   return (
//     <div className="p-4">
//       <EditorContent editor={editor} />
//     </div>
//   )
// }

// export default TiptapEditor