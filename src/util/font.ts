import { Urbanist } from 'next/font/google'

const sumClass = (...classnames: string[]) => {
  return classnames.join('')
}

const urbanist_init = Urbanist({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  style: ['italic', 'normal'],
  variable: '--urbanist',
})

// export const urbanist = urbanist_init.variable
export const FontClassNames = sumClass(urbanist_init.className)
