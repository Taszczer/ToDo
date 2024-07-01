'use client'
import { TNote } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export default function NoteBook() {

    const { data, isLoading, error } = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            return (await axios.get<TNote[]>("http://localhost:5000/notes")).data
        }
    })
    

    return (
        <div>
            <h1>twoje notatki</h1>
            {data?.map((note) => (
                <div key={note._id}>
                    <h1>{note.title}</h1>
                    <p>{note.descriptionText}</p>
                </div>
            ))}
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