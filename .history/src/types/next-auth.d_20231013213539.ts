import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User{
    username:string
  }
  interface Session {
    user: User & {
        username: string
    } 
    token:{
        username:string
    }
  }
}