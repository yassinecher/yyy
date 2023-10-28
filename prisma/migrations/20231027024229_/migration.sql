/*
  Warnings:

  - You are about to drop the column `CPUSupportId` on the `Processor` table. All the data in the column will be lost.
  - Added the required column `cpusupportId` to the `Processor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Processor" DROP CONSTRAINT "Processor_CPUSupportId_fkey";

-- AlterTable
ALTER TABLE "Processor" DROP COLUMN "CPUSupportId",
ADD COLUMN     "cpusupportId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Processor" ADD CONSTRAINT "Processor_cpusupportId_fkey" FOREIGN KEY ("cpusupportId") REFERENCES "CPUSupport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
