/*
  Warnings:

  - A unique constraint covering the columns `[motherboardId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "motherboardId" TEXT;

-- CreateTable
CREATE TABLE "Motherboard" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "details" JSONB,

    CONSTRAINT "Motherboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_motherboardId_key" ON "Product"("motherboardId");

-- CreateIndex
CREATE INDEX "unique_motherboard" ON "Product"("motherboardId");

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_motherboardId_fkey" FOREIGN KEY ("motherboardId") REFERENCES "Motherboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
