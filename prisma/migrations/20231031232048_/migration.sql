/*
  Warnings:

  - You are about to drop the column `additionalDetails` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "additionalDetails";

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Field_productId_idx" ON "Field"("productId");

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
