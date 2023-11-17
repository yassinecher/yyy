// pages/api/components.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export default async function handler(req: { method: string; body: { name: any; motherboardList: any; processorList: any; graphicCardList: any; powersupplyList: any; ramSlotList: any; storageList: any; caseList: any; }; }, res: {
    status: (arg0: number) => {
      (): any; new(): any; json: {
        (arg0: {
          motherboards: { id: string; productId: string; componentOnPcGroupeId: string | null; }[]; CPUs: { id: string; productId: string; componentOnPcGroupeId: string | null; }[]; GPUs: { id: string; productId: string; componentOnPcGroupeId: string | null; }[]; RAMs: { id: string; }[];
          // Create a new Compatibility Profile
          disks // Create a new Compatibility Profile
          : { id: string; }[]; cases: { id: string; productId: string; componentOnPcGroupeId: string | null; }[]; powersupplys: { id: string; productId: string; componentOnPcGroupeId: string | null; }[];
        } & { id: string; name: string; }): void; new(): any;
      };
    };
  }) {
  if (req.method === 'POST') {
    try {
      const { name, motherboardList, processorList, graphicCardList, powersupplyList, ramSlotList, storageList, caseList } = req.body;

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

      res.status(201).json(newCompatibilityProfile);
    } catch (error) {
      console.error('Error creating Compatibility Profile:', error);
     return new NextResponse("Internal error", { status: 500 });
    }
  } else {
    return new NextResponse("Internal error", { status: 500 });
  }

  await prisma.$disconnect();
}
