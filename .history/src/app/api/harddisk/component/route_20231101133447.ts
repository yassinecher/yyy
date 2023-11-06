
import { NextResponse } from 'next/server';


import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { } }
) {
  try {
    const body = await req.json();

    const {
      name, price, categoryId,  images, isFeatured, isArchived ,description,stock,additionalDetails,
      brandId,
      capacityId,
      DiscFormatId,
      ComputerinterfaceId,
      typeId,
    } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

   const motherboard = await prismadb.harddisk.create({
  data: {
    brandId,
    capacityId,
    DiscFormatId,
    ComputerinterfaceId,
    typeId,
    product: {
    create:{

      name, price, 
      categoryId,
       isFeatured,
        isArchived 
        ,description
        ,stock,
        additionalDetails:{
          createMany:{
           data: [...additionalDetails]
          }

        }
        ,
    images: {
      createMany: {
        data: images.map((image: { url: string }) => ({
          url: image.url,
        })),
      }
       // Replace any with the actual data types from your Prisma schema
  
   
  },
    }
   }}
});

    

    return  NextResponse.json(motherboard);
  } catch (error) {
    console.log('[MOTHERBOARD_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined;
    const isFeatured = searchParams.get('isFeatured');



    const products = await prismadb.product.findMany({
      where: {
    
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};