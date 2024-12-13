import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./TextEditorMenu";


type TextEditorProps = {
    onChange: (content: string) => void;
    initialContent?: string; 
  };


export default function RichTextEditor({
    onChange,
    initialContent,
  }: TextEditorProps) {

    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: initialContent,
        onUpdate : ({editor}) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "min-h-[50vh] cursor-text rounded-md border border-black p-5 ring-offset-background focus-within:outline-none"
            }
        },
        immediatelyRender: false
    })
  return (
    <div className="h-full">
      <TextEditorMenuBar editor={editor} />
        <EditorContent editor={editor} className="h-full"/>
    </div>
  )
}