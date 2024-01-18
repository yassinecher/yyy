
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { articlesPanier
    ,codePostal,moyenPaiement
,nom,
email,
telephone,
prenom,
rue,
ville,
} = await req.json();
  console.log()
  const productIds =articlesPanier
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }
return
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

 
  products.forEach((product) => {
   
  });

  const order = await prismadb.order.create({
    data: {
    
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  });


  return NextResponse.json({ }, {
    headers: corsHeaders
  });
};
