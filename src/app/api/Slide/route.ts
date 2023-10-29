import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
 
export async function POST(
  req: Request,
  { params }: { params: {  } }
) {
  try {
   

    const body = await req.json();

    const { title, imageUrl,url,description ,discount} = body;

   

    if (!title) {
      return new NextResponse("title is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("description is required", { status: 400 });
    }

    if (!title) {
      return new NextResponse("title is required", { status: 400 });
    }

   
    const billboard = await prismadb.slide.create({
      data: {
        title,
        imageUrl,
        description,
        url,
        discount
  
      }
    });
  
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const billboards = await prismadb.slide.findMany({
     
    });
  
    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
