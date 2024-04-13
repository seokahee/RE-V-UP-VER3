/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
import { DefaultSession } from 'next-auth'
import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | undefined
      uid?: string | undefined
    } & DefaultSession['user']
  }
}
