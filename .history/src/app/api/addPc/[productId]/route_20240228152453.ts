import { NextResponse } from "next/server";


import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId
      },
      include: {
        images: true,
        category: true,
        additionalDetails: true,
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }


    const deletedProduct = await prismadb.preBuiltPcmodel.delete({
      where: {
        productId: params.productId, // Replace with the actual property name used in your database
      },
      include:{
        pcTemplate:true
      }
    
    });
    await prismadb.pcTemplate.delete({
      where: {
        id: deletedProduct.pcTemplate.id, // Replace with the actual property name used in your database
      }
    });
    const product = await prismadb.product.delete({
      where: {
        id: params.productId
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { productId: string} }
) {
  try {
    const body = await req.json();

    // Extract necessary information from the request body
    const {  
      defaultcaseId,
            defaultgraphicCardId,
            defaulthardDiskArray,
            defaultmotherBoardId,
            defaultpowerSupplyId,
            defaultprocessorId,
            defaultramIdArray,
            discountOnPc,coolings,name, price, categoryId, images, isFeatured, isArchived, description, stock, additionalDetails, caseId, graphicCardId, motherBoardId, powerSupplyId, processorId, hardDiskArray, ramIdArray } = body;

    // Validation checks (similar to the POST function)
    const preBuiltPcmodelll= await prismadb.preBuiltPcmodel.findFirst({
      where:{
        productId:params.productId
      },
      include:{
        pcTemplate:{
          include:{
            graphicCardId:true,
            cooling:true,
            hardDiskArray:true,
            motherBoardId:true,
            caseId:true,
           powerSupplyId:true,
           PreBuiltPcmodel:true,
           processorId:true,
           ramIdArray :true
          }
        }
      }
    })
   await prismadb.entityProfile.deleteMany({
    where:{
      OR:[
        {
          id:{in:preBuiltPcmodelll?.pcTemplate.caseId.map((mb) => mb.id)  }
        },
        {
          id:{in:preBuiltPcmodelll?.pcTemplate.cooling.map((mb) => mb.id)  }
        },
        {
          id:{in:preBuiltPcmodelll?.pcTemplate.graphicCardId.map((mb) => mb.id)  }
        },
        {
          id:{in:preBuiltPcmodelll?.pcTemplate.motherBoardId.map((mb) => mb.id)  }
        },
        {
          id:{in:preBuiltPcmodelll?.pcTemplate.powerSupplyId.map((mb) => mb.id)  }
        },
        {
          id:{in:preBuiltPcmodelll?.pcTemplate.processorId.map((mb) => mb.id)  }
        }
      ]
    }
   })
   await prismadb.componentOnPcGroupeEntityProfile.deleteMany({
    where: {
      OR: [
        { id: { in: preBuiltPcmodelll?.pcTemplate.ramIdArray.map((mb) => mb.id) }  },
        { id: { in: preBuiltPcmodelll?.pcTemplate.hardDiskArray.map((mb) => mb.id) }  },
      ],
    },
  });
    const updatedProduct = await prismadb.preBuiltPcmodel.update({
      where: {
        productId: params.productId, // Replace with the actual property name used in your database
      },
      data: {
        product: {
          update: {
            name,
            price,
            isFeatured,
            isArchived,
            categoryId,
            description,
            stock,
            additionalDetails: {
              createMany:{
                data: [...additionalDetails]
               }
     
            },
            images: {
              createMany: {
                data: [
                  ...images.map((image: { url: string }) => image),
                ],
              },
            },
          },
        },
        pcTemplate:{
          update:{
            defaultcaseId,
            defaultgraphicCardId,
            defaulthardDiskArray,
            defaultmotherBoardId,
            defaultpowerSupplyId,
            defaultprocessorId,
            defaultramIdArray,
            discountOnPc:discountOnPc??0,

            motherBoardId: {
              create: motherBoardId.map((motherboard: String) => ({
                productId:motherboard
              })),
            },
            processorId: {
              create: processorId.map((cpu: String) => ({
                productId:cpu
              })),
            },
            graphicCardId: {
              create: graphicCardId.map((gpu: String) => ({
                productId:gpu
              })),
            },
            powerSupplyId: {
              create: powerSupplyId.map((powerSupply: String) => ({
                productId:powerSupply
              })),
            },
            caseId: {
              create: caseId.map((pcCase: String) => ({
                productId:pcCase
              })),
            },
            cooling: {
              create: coolings.map((pcCase: String) => ({
                productId:pcCase
              })),
            },
            ramIdArray: {
              create: ramIdArray.map((ramSlot: { rams: String[]; }) => ({
                Components: {
                  create: ramSlot.rams.map((ram: String) => ({
                    productId:ram
                  })),
                },
                
              })),
            },
            hardDiskArray: {
              create: hardDiskArray.map((storage: { disks: String[]; }) => ({
                Components: {
                  create: storage.disks.map((disk: String) => ({
                    productId:disk
                  })),
                },
           
              })),
            },

      },}}
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log('[PRODUCTS_PUT]', error);
    return new NextResponse("Internal error " + error, { status: 500 });
  }
};
