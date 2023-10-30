/*
  Warnings:

  - Added the required column `name` to the `RamSlots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `RamSlots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RamSlots" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
