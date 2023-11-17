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

      // Create a new Compatibility Profile
      const newCompatibilityProfile = await prisma.compatibiltyProfile.create({
        data: {
          name,
          motherboards: {
            connect: motherboardList.map((id: any) => ({ id })),
          },
          CPUs: {
            connect: processorList.map((id: any) => ({ id })),
          },
          GPUs: {
            connect: graphicCardList.map((id: any) => ({ id })),
          },
          powersupplys: {
            connect: powersupplyList.map((id: any) => ({ id })),
          },
          cases: {
            connect: caseList.map((id: any) => ({ id })),
          },
          RAMs: {
            connect: ramSlotList.map((ramSlot: { rams: any[]; }) => ramSlot.rams.map((id: any) => ({ id }))).flat(),
          },
          disks: {
            connect: storageList.map((storage: { disks: any[]; }) => storage.disks.map((id: any) => ({ id }))).flat(),
          },
        },
        include: {
          motherboards: true,
          CPUs: true,
          GPUs: true,
          powersupplys: true,
          cases: true,
          RAMs: true,
          disks: true,
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
