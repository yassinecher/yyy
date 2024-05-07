-- AlterTable
ALTER TABLE "PackOrder" ADD COLUMN     "orderId" TEXT;

-- AddForeignKey
ALTER TABLE "PackOrder" ADD CONSTRAINT "PackOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
