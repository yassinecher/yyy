/*
  Warnings:

  - You are about to drop the column `guaranteeId` on the `Motherboard` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Motherboard" DROP CONSTRAINT "Motherboard_guaranteeId_fkey";

-- AlterTable
ALTER TABLE "Motherboard" DROP COLUMN "guaranteeId";
