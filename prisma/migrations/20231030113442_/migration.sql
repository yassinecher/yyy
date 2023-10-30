/*
  Warnings:

  - Added the required column `motherboardChipsetId` to the `Gpu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gpu" ADD COLUMN     "motherboardChipsetId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_motherboardChipsetId_fkey" FOREIGN KEY ("motherboardChipsetId") REFERENCES "MotherboardChipset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
