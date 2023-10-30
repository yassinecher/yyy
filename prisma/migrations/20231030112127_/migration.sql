/*
  Warnings:

  - Added the required column `Recommendedpower` to the `Gpu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powerID` to the `Powersupply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gpu" ADD COLUMN     "Recommendedpower" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Powersupply" ADD COLUMN     "powerID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Power" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Power_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Powersupply" ADD CONSTRAINT "Powersupply_powerID_fkey" FOREIGN KEY ("powerID") REFERENCES "Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
