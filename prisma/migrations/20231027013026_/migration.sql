/*
  Warnings:

  - You are about to drop the column `gpuID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `harddiskID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `memoryID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `motherboardId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pccaseID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `powersupplyID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `processorId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_gpuID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_harddiskID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_memoryID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_motherboardId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_pccaseID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_powersupplyID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_processorId_fkey";

-- DropIndex
DROP INDEX "Product_gpuID_key";

-- DropIndex
DROP INDEX "Product_harddiskID_key";

-- DropIndex
DROP INDEX "Product_memoryID_key";

-- DropIndex
DROP INDEX "Product_pccaseID_key";

-- DropIndex
DROP INDEX "Product_powersupplyID_key";

-- DropIndex
DROP INDEX "Product_processorId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "gpuID",
DROP COLUMN "harddiskID",
DROP COLUMN "memoryID",
DROP COLUMN "motherboardId",
DROP COLUMN "pccaseID",
DROP COLUMN "powersupplyID",
DROP COLUMN "processorId";

-- CreateTable
CREATE TABLE "_ProductToMotherboard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToCPU" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToMemory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToPowersupply" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToGPU" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToPCCase" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToStorage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToMotherboard_AB_unique" ON "_ProductToMotherboard"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToMotherboard_B_index" ON "_ProductToMotherboard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToCPU_AB_unique" ON "_ProductToCPU"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToCPU_B_index" ON "_ProductToCPU"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToMemory_AB_unique" ON "_ProductToMemory"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToMemory_B_index" ON "_ProductToMemory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToPowersupply_AB_unique" ON "_ProductToPowersupply"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToPowersupply_B_index" ON "_ProductToPowersupply"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToGPU_AB_unique" ON "_ProductToGPU"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToGPU_B_index" ON "_ProductToGPU"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToPCCase_AB_unique" ON "_ProductToPCCase"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToPCCase_B_index" ON "_ProductToPCCase"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToStorage_AB_unique" ON "_ProductToStorage"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToStorage_B_index" ON "_ProductToStorage"("B");

-- AddForeignKey
ALTER TABLE "_ProductToMotherboard" ADD CONSTRAINT "_ProductToMotherboard_A_fkey" FOREIGN KEY ("A") REFERENCES "Motherboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToMotherboard" ADD CONSTRAINT "_ProductToMotherboard_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToCPU" ADD CONSTRAINT "_ProductToCPU_A_fkey" FOREIGN KEY ("A") REFERENCES "Processor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToCPU" ADD CONSTRAINT "_ProductToCPU_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToMemory" ADD CONSTRAINT "_ProductToMemory_A_fkey" FOREIGN KEY ("A") REFERENCES "Memory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToMemory" ADD CONSTRAINT "_ProductToMemory_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToPowersupply" ADD CONSTRAINT "_ProductToPowersupply_A_fkey" FOREIGN KEY ("A") REFERENCES "Powersupply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToPowersupply" ADD CONSTRAINT "_ProductToPowersupply_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToGPU" ADD CONSTRAINT "_ProductToGPU_A_fkey" FOREIGN KEY ("A") REFERENCES "Gpu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToGPU" ADD CONSTRAINT "_ProductToGPU_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToPCCase" ADD CONSTRAINT "_ProductToPCCase_A_fkey" FOREIGN KEY ("A") REFERENCES "PCcase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToPCCase" ADD CONSTRAINT "_ProductToPCCase_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToStorage" ADD CONSTRAINT "_ProductToStorage_A_fkey" FOREIGN KEY ("A") REFERENCES "Harddisk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToStorage" ADD CONSTRAINT "_ProductToStorage_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
