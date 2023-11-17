// pages/api/components.js
import prismadb from '@/lib/prismadb';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function POST(
  req: Request,
  { params }: { params: { } }
) {
  try {
    const body = await req.json();
      const { name, motherboardList, processorList, graphicCardList, powersupplyList, ramSlotList, storageList, caseList } = body;

 
      // Create a new Compatibility Profile and associated components
      const newCompatibilityProfile = await prisma.compatibiltyProfile.create({
        data: {
          name,
          motherboards: {
            create: motherboardList.map((motherboard: string) => ({
              productId:motherboard
            })),
          },
          CPUs: {
            create: processorList.map((cpu: any) => ({
              productId:cpu
            })),
          },
          GPUs: {
            create: graphicCardList.map((gpu: any) => ({
              productId:gpu
            })),
          },
          powersupplys: {
            create: powersupplyList.map((powerSupply: any) => ({
              productId:powerSupply
            })),
          },
          cases: {
            create: caseList.map((pcCase: any) => ({
              productId:pcCase
            })),
          },
          RAMs: {
            create: ramSlotList.map((ramSlot: { rams: any[]; }) => ({
              rams: {
                create: ramSlot.rams.map((ram: any) => ({
                  productId:ram
                })),
              },
            })),
          },
          disks: {
            create: storageList.map((storage: { disks: any[]; }) => ({
              disks: {
                create: storage.disks.map((disk: any) => ({
                  productId:disk
                })),
              },
            })),
          },
        },
        include: {
          motherboards: true,
          CPUs: true,
          GPUs: true,
          powersupplys: true,
          cases: true,
          RAMs: { include: { rams: true } },
          disks: { include: { disks: true } },
        },
      });
      return  NextResponse.json(newCompatibilityProfile);
    } catch (error) {
      console.log('[MOTHERBOARD_POST]', error);
      return new NextResponse("Internal error", { status: 500 });
    }}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined;
    const isFeatured = searchParams.get('isFeatured');



    const products = await prismadb.compatibiltyProfile.findMany({
    
    });
  
    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
