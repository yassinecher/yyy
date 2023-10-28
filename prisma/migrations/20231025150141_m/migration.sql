-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_motherboardId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "motherboardId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_motherboardId_fkey" FOREIGN KEY ("motherboardId") REFERENCES "Motherboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
