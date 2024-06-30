import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
    ],
    editorProps: {
      attributes: {
        class: 'absolute bottom-[30%] right-[10%] prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    content: `
dakljfklajdklfajklfjdaklfjkladjklf
    `,
  })

  return (
    <div className="p-4">
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapEditor