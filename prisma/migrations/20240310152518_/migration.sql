-- AlterTable
ALTER TABLE "Slide" ADD COLUMN     "DeletedPrice" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "DeletedPriceColor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "Price" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "PriceColor" TEXT NOT NULL DEFAULT '';
