'use client'

import React, { Dispatch, SetStateAction, useMemo } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Quill } from 'react-quill'
import { formats, toolbarOptions } from './value'
import { QuillEditor } from './QuillEditor'

type QuillEditorProps = {
  content: string
  setCommunityForm: Dispatch<
    SetStateAction<{ boardTitle: string; content: string }>
  >
}

const CommunityQuillEditor = ({
  content,
  setCommunityForm,
}: QuillEditorProps) => {
  // const onImageHandler = () => {
  //   if (typeof window !== 'undefined') {
  //     const input = document.createElement('input')
  //     input.setAttribute('type', 'file')
  //     input.setAttribute('accept', 'image/*')
  //     input.click()
  // input.addEventListener('change', async () => {
  // const file = input?.files[0]
  // try {
  // const res = await supabase.({ img: file })
  //     const imgUrl = res?.data.imgUrl
  //     const editor = quillRef?.current?.getEditor()
  //     const range = editor.getSelection()
  //     editor.insertEmbed(range.index, 'image', imgUrl)
  //     editor.setSelection(range.index + 1)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })
  //   }
  // }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        ImageResize: {
          parchment: Quill.import('parchment'),
        },
      },
    }),
    [content],
  )

  const onEditorChangeHandler = (value: string) => {
    setCommunityForm((prevData) => ({
      ...prevData,
      content: value,
    }))
  }

  return (
    <div>
      <QuillEditor
        value={content}
        onChange={onEditorChangeHandler}
        modules={modules}
        formats={formats}
        placeholder='추천할 음악에 대해 얘기해 주세요.'
        className='rounded-[12px] text-white [&_.ql-container.ql-snow]:rounded-[12px] [&_.ql-container.ql-snow]:border-[#ffffff1a] [&_.ql-editor.ql-blank::before]:text-[16px] [&_.ql-editor.ql-blank::before]:not-italic [&_.ql-editor.ql-blank::before]:text-[#ffffff5a] [&_.ql-editor.ql-blank]:text-white [&_.ql-editor]:h-[200px] [&_.ql-editor]:rounded-[12px] [&_.ql-editor]:bg-[#ffffff1a] [&_.ql-toolbar.ql-snow]:rounded-[12px] [&_.ql-toolbar.ql-snow]:border-[#ffffff1a] [&_quill]:rounded-[12px] '
      />
    </div>
  )
}

export default CommunityQuillEditor
