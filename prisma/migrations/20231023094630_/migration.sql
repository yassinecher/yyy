/*
  Warnings:

  - Made the column `motherboardId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_motherboardId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "motherboardId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_motherboardId_fkey" FOREIGN KEY ("motherboardId") REFERENCES "Motherboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
