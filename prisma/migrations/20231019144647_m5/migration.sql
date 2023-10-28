/*
  Warnings:

  - You are about to drop the `Image2` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageUrl` to the `Manufacturer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image2" DROP CONSTRAINT "Image2_manufacturerId_fkey";

-- AlterTable
ALTER TABLE "Manufacturer" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "Image2";
