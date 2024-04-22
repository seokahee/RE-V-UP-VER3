'use client'

import React, { Dispatch, SetStateAction, useMemo, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import loading from '@/../public/images/loadingBar.gif'
import Image from 'next/image'
import { Quill, ReactQuillProps } from 'react-quill'
import { formats, toolbarOptions } from './value'

type QuillEditorProps = {
  content: string
  setCommunityForm: Dispatch<
    SetStateAction<{ boardTitle: string; content: string }>
  >
  quillRef: React.RefObject<ReactQuillProps>
}

export const QuillEditor =
  typeof window !== 'undefined'
    ? dynamic(
        async () => {
          const { default: RQ } = await import('react-quill')
          return function comp({ forwardedRef, ...props }: any) {
            return <RQ ref={forwardedRef} {...props} />
          }
        },
        {
          ssr: false,
          loading: () => {
            return (
              <div>
                <Image src={loading} width={50} height={50} alt='로딩바' />
              </div>
            )
          },
        },
      )
    : () => false

const CommunityQuillEditor = ({
  content,
  setCommunityForm,
  quillRef,
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
        // handlers: {
        //   image: onImageHandler,
        // },
      },
    }),
    [quillRef],
  )

  const onEditorChangeHandler = (value: string) => {
    setCommunityForm((prevData) => ({
      ...prevData,
      content: value,
    }))
  }

  return (
    <QuillEditor
      theme='snow'
      value={content}
      onChange={onEditorChangeHandler}
      modules={modules}
      formats={formats}
      placeholder='추천할 음악에 대해 얘기해 주세요.'
      className='rounded-[12px] text-white [&_.ql-container.ql-snow]:rounded-[12px] [&_.ql-container.ql-snow]:border-[#ffffff1a] [&_.ql-editor.ql-blank::before]:text-[16px] [&_.ql-editor.ql-blank::before]:not-italic [&_.ql-editor.ql-blank::before]:text-[#ffffff5a] [&_.ql-editor.ql-blank]:text-white [&_.ql-editor]:h-[200px] [&_.ql-editor]:rounded-[12px] [&_.ql-editor]:bg-[#ffffff1a] [&_.ql-toolbar.ql-snow]:rounded-[12px] [&_.ql-toolbar.ql-snow]:border-[#ffffff1a] [&_quill]:rounded-[12px] '
      ref={quillRef}
    />
  )
}

export default CommunityQuillEditor
