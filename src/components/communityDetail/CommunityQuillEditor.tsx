'use client'

import React, { Dispatch, SetStateAction, useMemo, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import loading from '@/../public/images/loadingBar.gif'
import Image from 'next/image'
import ReactQuill, { Quill, ReactQuillProps } from 'react-quill'
import { ImageActions } from '@xeger/quill-image-actions'
import { ImageFormats } from '@xeger/quill-image-formats'

Quill.register('modules/imageActions', ImageActions)
Quill.register('modules/imageFormats', ImageFormats)

type QuillEditorProps = {
  content: string
  setCommunityForm: Dispatch<
    SetStateAction<{ boardTitle: string; content: string }>
  >
  quillRef: React.RefObject<ReactQuillProps>
}

const QuillEditor = dynamic(
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

const CommunityQuillEditor = ({
  content,
  setCommunityForm,
  quillRef,
}: QuillEditorProps) => {
  const toolbarOptions = [
    [{ size: [false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ color: [] }, { background: [] }, { align: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ]

  const imageHandler = () => {
    // const input = document.createElement('input')
    // input.setAttribute('type', 'file')
    // input.setAttribute('accept', 'image/*')
    // input.click()
    // input.addEventListener('change', async () => {
    //   const file = input?.files[0]
    //   try {
    //     // const res = await supabase.({ img: file })
    //     const imgUrl = res?.data.imgUrl
    //     const editor = quillRef?.current?.getEditor()
    //     const range = editor.getSelection()
    //     editor.insertEmbed(range.index, 'image', imgUrl)
    //     editor.setSelection(range.index + 1)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // })
  }

  const modules = useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: toolbarOptions,
        ImageResize: {
          parchment: Quill.import('parchment'),
        },
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  )

  const formats = [
    'size',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'align',
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
    <>
      {/* <QuillEditor /> */}
      <QuillEditor
        theme='snow'
        value={content}
        onChange={onEditorChangeHandler}
        modules={modules}
        formats={formats}
        placeholder='추천할 음악에 대해 얘기해 주세요.'
        className='h-[200px] bg-[rgba(255,255,255,0.1)] text-white placeholder:text-white [&_.ql-container.ql-snow]:border-black [&_.ql-container.ql-snow]:text-white [&_.ql-toolbar.ql-snow]:border-black'
        ref={quillRef}
      />
    </>
  )
}

export default CommunityQuillEditor
