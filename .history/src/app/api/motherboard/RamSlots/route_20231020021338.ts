import { db } from "@/lib/db";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST( req: Request) {
    try { 
        const body = await req.json();
        const { number } = body;
        if(!number){
            return new NextResponse("ram error", { status: 500 });
        }
        const format=await prismadb.ramSlots.create({
            data: {
                number
            }
        })
        return NextResponse.json(format);
        
     } catch (error) {
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse("Internal error"+error, { status: 500 });
      }
    
}