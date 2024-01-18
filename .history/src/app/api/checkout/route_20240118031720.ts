import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { PCCustom } from "@/hooks/use-cart";
import { pcOrder } from "@prisma/client";
import nodemailer from 'nodemailer';
import { Product } from "@/types";
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

    const productIdss = articlesPanier as Product[];
    const productIds=productIdss.map((e)=>e.id)
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
      include:{
        images:true
      }
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
     // Create a Nodemailer transporter using SMTP configuration from Oracle Cloud Email Delivery
     const transporter = nodemailer.createTransport({
      host: 'smtp.email.eu-marseille-1.oci.oraclecloud.com', // Example SMTP server address
      port: 587, // Example port (could be different based on Oracle Cloud Email Delivery)
      secure: false, // Set to true if using TLS/SSL
      auth: {
        user: 'ocid1.user.oc1..aaaaaaaa7uwytzp4lbhb65r57yyi2p6znjl3rb73vzidzmged7bm7sjsc2gq@ocid1.tenancy.oc1..aaaaaaaacwunturhlf2zdumldp6fycblqedl4uky3gxexc4cxwjosjfua63q.lj.com', // Your Oracle Cloud Email Delivery sender email
        pass: 'IvLq0Fg6(R7}P5}VNh_u', // Your Oracle Cloud Email Delivery sender email password or API key
      },
    });

    const emailBody = `
    <style>
      h1 {
        color: #333333;
      }
  
      p {
        color: #555555;
      }
  
      ul {
        list-style-type: none;
        padding: 0;
      }
  
      li {
        margin-bottom: 15px;
      }
  
      img {
        max-width: 100px;
        max-height: 100px;
        margin-right: 10px;
      }
  
      strong {
        color: #007BFF;
      }
  
      .total {
        margin-top: 20px;
        font-weight: bold;
        font-size: 18px;
        color: #333333;
      }
    </style>
    <h1>Commande</h1>
    <p>Merci pour votre commande! Voici le récapitulatif de votre commande:</p>
    <ul>
      ${products.map((product) => `
        <li>
          <img src="${product.images[0].url}" alt="${product.name}">
          <strong>${product.name}</strong> - ${product.price} TND
        </li>
      `).join('')}
    </ul>
    <p class="total">Total: ${orderItems.length} produits</p>
  `;

      // Email options
      const mailOptions = {
        from: 'support@gaminggear.tn',
        to: email,
        subject: "Commande",
        html: emailBody, // Use HTML for a more structured email body
      };
    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
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
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
 try{
  const orders = await prismadb.order.findMany()
        
  return NextResponse.json(orders);
 } catch (error) {
  console.error("Failed to create order:", error);
  return new NextResponse("Internal server error", { status: 500 });
}

}