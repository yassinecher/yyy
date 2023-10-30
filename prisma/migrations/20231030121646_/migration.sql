/*
  Warnings:

  - You are about to drop the column `Recommendedpower` on the `Gpu` table. All the data in the column will be lost.
  - You are about to drop the column `motherboardChipsetId` on the `Gpu` table. All the data in the column will be lost.
  - You are about to drop the column `pcieId` on the `Gpu` table. All the data in the column will be lost.
  - You are about to drop the column `pcieId` on the `Motherboard` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `PCcase` table. All the data in the column will be lost.
  - You are about to drop the column `powerID` on the `Powersupply` table. All the data in the column will be lost.
  - You are about to drop the `PCcaseProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pcie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Power` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GpuToPCcaseProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MotherboardToPCcaseProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MotherboardToPcie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MotherboardToRamSlots` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ramslotsId` to the `Motherboard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gpu" DROP CONSTRAINT "Gpu_motherboardChipsetId_fkey";

-- DropForeignKey
ALTER TABLE "Gpu" DROP CONSTRAINT "Gpu_pcieId_fkey";

-- DropForeignKey
ALTER TABLE "PCcase" DROP CONSTRAINT "PCcase_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Powersupply" DROP CONSTRAINT "Powersupply_powerID_fkey";

-- DropForeignKey
ALTER TABLE "_GpuToPCcaseProfile" DROP CONSTRAINT "_GpuToPCcaseProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_GpuToPCcaseProfile" DROP CONSTRAINT "_GpuToPCcaseProfile_B_fkey";

-- DropForeignKey
ALTER TABLE "_MotherboardToPCcaseProfile" DROP CONSTRAINT "_MotherboardToPCcaseProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_MotherboardToPCcaseProfile" DROP CONSTRAINT "_MotherboardToPCcaseProfile_B_fkey";

-- DropForeignKey
ALTER TABLE "_MotherboardToPcie" DROP CONSTRAINT "_MotherboardToPcie_A_fkey";

-- DropForeignKey
ALTER TABLE "_MotherboardToPcie" DROP CONSTRAINT "_MotherboardToPcie_B_fkey";

-- DropForeignKey
ALTER TABLE "_MotherboardToRamSlots" DROP CONSTRAINT "_MotherboardToRamSlots_A_fkey";

-- DropForeignKey
ALTER TABLE "_MotherboardToRamSlots" DROP CONSTRAINT "_MotherboardToRamSlots_B_fkey";

-- AlterTable
ALTER TABLE "Gpu" DROP COLUMN "Recommendedpower",
DROP COLUMN "motherboardChipsetId",
DROP COLUMN "pcieId";

-- AlterTable
ALTER TABLE "Motherboard" DROP COLUMN "pcieId",
ADD COLUMN     "ramslotsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PCcase" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "Powersupply" DROP COLUMN "powerID";

-- DropTable
DROP TABLE "PCcaseProfile";

-- DropTable
DROP TABLE "Pcie";

-- DropTable
DROP TABLE "Power";

-- DropTable
DROP TABLE "_GpuToPCcaseProfile";

-- DropTable
DROP TABLE "_MotherboardToPCcaseProfile";

-- DropTable
DROP TABLE "_MotherboardToPcie";

-- DropTable
DROP TABLE "_MotherboardToRamSlots";

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_ramslotsId_fkey" FOREIGN KEY ("ramslotsId") REFERENCES "RamSlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
