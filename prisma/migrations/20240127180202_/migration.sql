-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "orderId" DROP DEFAULT,
ALTER COLUMN "pcOrderId" DROP NOT NULL,
ALTER COLUMN "pcOrderId" DROP DEFAULT;