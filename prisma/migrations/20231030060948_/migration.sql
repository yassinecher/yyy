-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "dicountPrice" DECIMAL(65,30) NOT NULL DEFAULT 0;
