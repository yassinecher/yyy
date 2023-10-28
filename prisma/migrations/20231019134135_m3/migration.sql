/*
  Warnings:

  - You are about to drop the column `details` on the `Motherboard` table. All the data in the column will be lost.
  - Added the required column `chipsetId` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpusupportId` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formatId` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guaranteeId` to the `Motherboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ramslotsId` to the `Motherboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motherboard" DROP COLUMN "details",
ADD COLUMN     "chipsetId" TEXT NOT NULL,
ADD COLUMN     "cpusupportId" TEXT NOT NULL,
ADD COLUMN     "formatId" TEXT NOT NULL,
ADD COLUMN     "guaranteeId" TEXT NOT NULL,
ADD COLUMN     "ramslotsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RamSlots" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "RamSlots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotherboardChipset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MotherboardChipset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CPUSupport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CPUSupport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guarantee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Guarantee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotherboardFormat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MotherboardFormat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_ramslotsId_fkey" FOREIGN KEY ("ramslotsId") REFERENCES "RamSlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_chipsetId_fkey" FOREIGN KEY ("chipsetId") REFERENCES "MotherboardChipset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_cpusupportId_fkey" FOREIGN KEY ("cpusupportId") REFERENCES "CPUSupport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_guaranteeId_fkey" FOREIGN KEY ("guaranteeId") REFERENCES "Guarantee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "MotherboardFormat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
