/*
  Warnings:

  - You are about to drop the column `billboardId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Billboard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_billboardId_fkey";

-- DropIndex
DROP INDEX "Category_billboardId_idx";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "billboardId";

-- DropTable
DROP TABLE "Billboard";
