
import { NextResponse } from 'next/server';


import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: {} }
) {
  try {


    const body = await req.json();

    const { name, price, categoryId, images, isFeatured, isArchived,  description, stock, additionalDetails,
      certification80ID,
      powersupplyMarqueID,
      modularity,
      Power,
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


    const cer= await prismadb.certification80.findUnique({
      where:{
        id:certification80ID
      }
    })
    console.log(cer)


    const product = await prismadb.powersupply.create({
      data: {
        certification80Id:cer!.id,
        powersupplyMarqueId:powersupplyMarqueID,
        modularity,
        Power,

        products: {
          create: {

            name, price,
            categoryId,
            isFeatured,
            isArchived
            , description
            , stock,
            additionalDetails: {
              createMany: {
                data: [...additionalDetails]
              }

            },
          }
        }

      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
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
