import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req){
        console.log("token: ", req.nextauth.token);

        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
          return NextResponse.rewrite(
            new URL("/login?message=You Are Not Authorized!", req.url)
          );
        if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user")
          return NextResponse.rewrite(
            new URL("/login?message=You Are Not Authorized!", req.url)
          );
    },
    {
        callbacks:{
            authorized:({token})=> !!token,
        }
    }
)

export const config ={
    matcher:["/admin/:path*","/user/:path*"],
}