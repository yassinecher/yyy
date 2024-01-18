import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { PCCustom } from "@/hooks/use-cart";
import { pcOrder } from "@prisma/client";
import nodemailer from 'nodemailer';
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
type pcOrderCreateWithoutOrdersInput = {
  motorderItemId:  String,
  proorderItemId:  String,
  gpuorderItemId:  String,
  ramorderItemId:  String,
  disorderItemId:  String,
  poworderItemId:  String,
  casorderItemId:  String,
  scrorderItemId:  String,
  cooorderItemId:  String,

};
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const {
      articlesPanier,
      pcOrder,
      codePostal,
      moyenPaiement,
      nom,
      email,
      telephone,
      prenom,
      rue,
      ville,
    } = await req.json();

    const productIds = articlesPanier;
    const pc = pcOrder as PCCustom[];

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Product ids are required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const orderItems = productIds.map((productId: string) => ({
      product: {
        connect: {
          id: productId,
        },
      },
    }));
    const pcOrderItems: pcOrder[] = pc.map((productId) => ({
        motorderItemId: productId.motherboard.id,
        proorderItemId: productId.processor.id,
        gpuorderItemId: productId.gpu.id,
        ramorderItemId: productId.ram.map((e)=>e.id), // Assuming ram is an array, adjust as needed
        disorderItemId: productId.disk.id,
        poworderItemId: productId.power.id,
        casorderItemId: productId.case.id,
        scrorderItemId: productId.screen?.id || '', // Assuming screen is optional
        cooorderItemId: productId.cooling?.id || '', // Assuming cooling is optional
        price: productId.price.toString(),
        id: "", // Adjust as needed
      }));
    
    const order = await prismadb.order.create({
      data: {
        isPaid: false,
        phone: telephone || "",
        address: `${rue || ""}, ${ville || ""}, ${codePostal || ""}`,
        name: nom || "",
        lastName: prenom || "",
        email: email || "",
        orderItems: {
          create: orderItems,
        },
        orderPc: {
          create: pcOrderItems,
        },
      },
    });
    
    return NextResponse.json({ order }, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create order:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// Helper function to get an array of productIds from PCCustom
const getProductIds = (pcCustom: PCCustom): string[] => {
  const productIds: string[] = [];
  productIds.push(pcCustom.motherboard.id);
  productIds.push(pcCustom.processor.id);
  productIds.push(pcCustom.gpu.id);
  pcCustom.ram.forEach((ramModule) => productIds.push(ramModule.id));
  productIds.push(pcCustom.disk.id);
  productIds.push(pcCustom.power.id);
  productIds.push(pcCustom.case.id);
  if (pcCustom.screen) productIds.push(pcCustom.screen.id);
  if (pcCustom.cooling) productIds.push(pcCustom.cooling.id);
  return productIds;
};
