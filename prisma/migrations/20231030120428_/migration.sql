/*
  Warnings:

  - You are about to drop the column `ramslotsId` on the `Motherboard` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Motherboard" DROP CONSTRAINT "Motherboard_pcieId_fkey";

-- DropForeignKey
ALTER TABLE "Motherboard" DROP CONSTRAINT "Motherboard_ramslotsId_fkey";

-- AlterTable
ALTER TABLE "Motherboard" DROP COLUMN "ramslotsId";

-- CreateTable
CREATE TABLE "_MotherboardToRamSlots" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MotherboardToPcie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MotherboardToRamSlots_AB_unique" ON "_MotherboardToRamSlots"("A", "B");

-- CreateIndex
CREATE INDEX "_MotherboardToRamSlots_B_index" ON "_MotherboardToRamSlots"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MotherboardToPcie_AB_unique" ON "_MotherboardToPcie"("A", "B");

-- CreateIndex
CREATE INDEX "_MotherboardToPcie_B_index" ON "_MotherboardToPcie"("B");

-- AddForeignKey
ALTER TABLE "_MotherboardToRamSlots" ADD CONSTRAINT "_MotherboardToRamSlots_A_fkey" FOREIGN KEY ("A") REFERENCES "Motherboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MotherboardToRamSlots" ADD CONSTRAINT "_MotherboardToRamSlots_B_fkey" FOREIGN KEY ("B") REFERENCES "RamSlots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MotherboardToPcie" ADD CONSTRAINT "_MotherboardToPcie_A_fkey" FOREIGN KEY ("A") REFERENCES "Motherboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MotherboardToPcie" ADD CONSTRAINT "_MotherboardToPcie_B_fkey" FOREIGN KEY ("B") REFERENCES "Pcie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
