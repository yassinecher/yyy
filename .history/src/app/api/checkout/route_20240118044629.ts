import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { PCCustom } from "@/hooks/use-cart";
import { pcOrder } from "@prisma/client";
import nodemailer from 'nodemailer';
import { Product } from "@/types";
import { v4 as uuidv4 } from 'uuid';
const path = require('path');
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
const fs = require('fs');
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
      totalPrice
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
    const pcOrderItems= pc.map((productId) => ({
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

      }));


   
      console.log({
        data: {
       
          isPaid: false,
          phone: telephone || "",
          address: `${rue || ""}, ${ville || ""}, ${codePostal || ""}`,
          name: nom || "",
          lastName: prenom || "",
          email: email || "",
          orderItems: {
            create: [...orderItems],
          },
          orderPc: {
            create: pcOrderItems,
          },
        },
      })
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
    const htmlFilePath = path.join(process.cwd(), 'public', 'mail', 'mail-model.html');
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    const prodshtml = genratehtml(productIdss);
    
    htmlContent = htmlContent.replace("${prodssss}", prodshtml);
    htmlContent = htmlContent.replace("${itemNumber}", productIdss.length);
    htmlContent = htmlContent.replace("${TotaLPrice}", totalPrice);
    htmlContent = htmlContent.replace("${ville}", ville);
    htmlContent = htmlContent.replace("${rue}", rue);
    htmlContent = htmlContent.replace("${codePostal}", codePostal);
    const emailBody =htmlContent

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
  try {
    // Fetch orders
    const orders = await prismadb.order.findMany();

    // Extract order IDs
    const orderIds = orders.map((order) => order.id);

    // Delete related OrderItems
    await prismadb.orderItem.deleteMany({
      where: {
        orderId: {
          in: orderIds,
        },
      },
    });

    // Delete orders
    await prismadb.order.deleteMany({
      where: {
        id: {
          in: orderIds,
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Failed to delete orders:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

function generateHashId() {
  const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal
  const random = Math.random().toString(16).substring(2); // Generate random hexadecimal string

  return `${timestamp}-${random}`;
}


function genratehtml(prod:Product[]){

let res= ''

prod.map((e)=>{
  console.log(e.images[0])
  res=res+`<tr>
  <td class="esdev-adapt-off" align="left" style="padding:20px;Margin:0">
      <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
          <tr>
              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                  <table cellpadding="0" cellspacing="0" class="es-left"
                      align="left" role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                      <tr>
                          <td align="left" style="padding:0;Margin:0;width:125px">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                  role="presentation"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr>
                                      <td align="center"
                                          style="padding:0;Margin:0;font-size:0px">
                                          <a target="_blank"
                                              href="https://viewstripo.email"
                                              style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#926B4A;font-size:14px">
                                              <img
                                                  class="adapt-img p_image"
                                                  src="${e.images[0]}"
                                                  alt="Sony WH-1000XM4"
                                                  style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                  width="125"
                                                  title="Sony WH-1000XM4"
                                                  height="125"></a> </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
              <td style="padding:0;Margin:0;width:20px"></td>
              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                  <table cellpadding="0" cellspacing="0" class="es-left"
                      align="left" role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                      <tr>
                          <td align="left" style="padding:0;Margin:0;width:125px">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                  role="presentation"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr>
                                      <td align="left"
                                          class="es-m-p0t es-m-p0b es-m-txt-l"
                                          style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px">
                                          <h3
                                              style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333">
                                              <strong class="p_name">${e.name}
                                                  </strong></h3>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
              <td style="padding:0;Margin:0;width:20px"></td>
              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                  <table cellpadding="0" cellspacing="0" class="es-left"
                      align="left" role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                      <tr>
                          <td align="left" style="padding:0;Margin:0;width:176px">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                  role="presentation"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr>
                                      <td align="right" class="es-m-p0t es-m-p0b"
                                          style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px">
                                          <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666;font-size:14px"
                                              class="p_description">x1</p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
              <td style="padding:0;Margin:0;width:20px"></td>
              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                  <table cellpadding="0" cellspacing="0" class="es-right"
                      align="right" role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                      <tr>
                          <td align="left" style="padding:0;Margin:0;width:74px">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                  role="presentation"
                                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                  <tr>
                                      <td align="right" class="es-m-p0t es-m-p0b"
                                          style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px">
                                          <p class="p_price"
                                              style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666;font-size:14px">
                                              ${e.price}</p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </td>
</tr>`
})
return res
}