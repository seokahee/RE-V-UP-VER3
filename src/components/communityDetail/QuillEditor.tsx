import dynamic from 'next/dynamic'
import Image from 'next/image'
import loading from '@/../public/images/loadingBar.gif'

import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef?: React.Ref<ReactQuill>
}

export const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill')
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    )
    return Quill
  },
  {
    loading: () => (
      <div>
        <Image src={loading} width={50} height={50} alt='로딩바' />
      </div>
    ),
    ssr: false,
  },
)
