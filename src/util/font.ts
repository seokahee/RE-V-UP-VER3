import { Urbanist } from 'next/font/google'

const urbanist_init = Urbanist({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700'],
  style: ['italic', 'normal'],
  variable: '--font-urbanist',
})

export const urbanistFont = urbanist_init.variable
