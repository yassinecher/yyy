/*
  Warnings:

  - Added the required column `pcieId` to the `Gpu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `PCcase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gpu" ADD COLUMN     "pcieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Motherboard" ADD COLUMN     "pcieId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "PCcase" ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Pcie" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Pcie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PCcaseProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PCcaseProfile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_pcieId_fkey" FOREIGN KEY ("pcieId") REFERENCES "Pcie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_pcieId_fkey" FOREIGN KEY ("pcieId") REFERENCES "Pcie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCcase" ADD CONSTRAINT "PCcase_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "PCcaseProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
