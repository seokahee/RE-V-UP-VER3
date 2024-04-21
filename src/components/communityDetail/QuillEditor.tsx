'use client'

import React, { Dispatch, SetStateAction, useMemo } from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import loading from '@/../public/images/loadingBar.gif'
import Image from 'next/image'

const QuillWrapper = dynamic(async () => import('react-quill'), {
  ssr: false,
  loading: () => {
    return (
      <div>
        <Image src={loading} width={50} height={50} alt='로딩바' />
      </div>
    )
  },
})

type QuillEditorProps = {
  content: string
  setCommunityForm: Dispatch<
    SetStateAction<{ boardTitle: string; content: string }>
  >
}

const QuillEditor = ({ content, setCommunityForm }: QuillEditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
      ],
    }),
    [],
  )

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]

  const onEditorChangeHandler = (value: string) => {
    setCommunityForm((prevData) => ({
      ...prevData,
      content: value,
    }))
  }
  return (
    <QuillWrapper
      theme='snow'
      value={content}
      onChange={onEditorChangeHandler}
      modules={modules}
      formats={formats}
      placeholder='추천할 음악에 대해 얘기해 주세요.'
      className='h-[200px] bg-[rgba(255,255,255,0.1)]  text-white [&_.ql-container.ql-snow]:border-black [&_.ql-container.ql-snow]:text-white [&_.ql-toolbar.ql-snow]:border-black'
    />
  )
}

export default QuillEditor
