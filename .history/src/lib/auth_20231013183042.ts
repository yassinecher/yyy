import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "./db";
import { compare } from "bcrypt";
export const authOptions:NextAuthOptions={
    adapter:PrismaAdapter(db),
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:'/sign-in'
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "signin",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email||!credentials.password) return null
            const existingUser= await db.user.findUnique({
                where:{email:credentials.email}
            })
            if(!existingUser)return null
            const passwordmatch = await compare(credentials.password, existingUser.password)
            if(!passwordmatch) return null
            return {
                id:existingUser.id,
                email:existingUser.email,
                username:existingUser.username
            }
          }
        })
      ]
}