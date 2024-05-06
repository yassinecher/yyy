import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { }: {}
) {
  try {


    const body = await req.json();

    const { name, price, categoryId, images, isFeatured, isArchived, description, stock,
      Clavier,
      Mouse,
      MousePad,
      Mic,
      Headset,
      Camera,
      Screen,
      Speaker,
      Manette,
      Chair,
      discountOnPack,
      DefaultClavier,
      DefaultMouse,
      DefaultMousePad,
      dicountPrice,
      DefaultMic,
      DefaultHeadset,
      DefaultCamera,
      DefaultScreen,
      DefaultSpeaker,
      DefaultManette,
      DefaultChair,
      additionalDetails
    } = body;
    console.log(body)
    if (!description) {
      return new NextResponse("description is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }



    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }


    const product = await prismadb.accessoryPack.create({
      data: {
        Product: {
          create: {
            name,
            price: price,
            isFeatured: isFeatured,
            isArchived: isArchived,
            description: description,
            categoryId: categoryId,
            stock: stock,
            dicountPrice: dicountPrice,
            additionalDetails: {
              createMany: {
                data: [...additionalDetails]
              }

            },
            images: {
              createMany: {
                data: images.map((image: { url: string }) => ({
                  url: image.url,
                })),
              }
              // Replace any with the actual data types from your Prisma schema


            },
          }
        },
        DefaultCamera,
        DefaultChair,
        DefaultClavier,
        DefaultHeadset,
        DefaultManette,
        DefaultMic,
        DefaultMouse,
        DefaultMousePad,
        DefaultScreen,
        DefaultSpeaker,
        discountOnPack,
        Clavier: {
          connect: Clavier.map((pcCase: any) => ({
            id: pcCase.id
          })),
        },
        Camera: {
          connect: Camera.map((pcCase: any) => ({
            id: pcCase.id
          })),
        },
        Chair: {
          connect: Chair.map((pcCase: any) => ({
            id: pcCase.id
          })),
        },
        Headset: {
          connect: Headset.map((pcCase: any) => ({
            id: pcCase.id
          })),
        },
        Manette: {
          connect: Manette.map((pcCase: any) => ({
            id: pcCase.id
          })),
        },
        Mouse: {
          connect: Mouse.map((pcCase: any) => ({
            id: pcCase.id
          })),
        },
        MousePad: {
          connect: MousePad.map((pcCase: any) => ({
            id: pcCase.id
          })),
        },
        Screen: {
          connect: Screen.map((pcCase: any) => ({
            id: pcCase.id
          })),
        },
        Mic: {
          connect: Mic.map((pcCase: any) => ({
            id: pcCase.id
          })),
        },
        Speaker: {
          connect: Speaker.map((pcCase: any) => ({
            id:pcCase.id
          })),},


      }

    })
    console.log('[PRODUCTS_POST]', product);

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error " + error, { status: 500 });
  }
};

export async function DELETE(
  req: Request,
) {
  try {



    const products = await prismadb.accessoryPack.deleteMany();

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function GET(
  req: Request,
) {
  try {


    const products = await prismadb.accessoryPack.findMany({

      include: {
        Camera: true,
        Chair: true,
        Clavier: true,
        Headset: true,
        Manette: true,
        Mic: true,
        Mouse: true,
        MousePad: true,
        Product: true,
        Screen: true,
        Speaker: true
      },

    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
