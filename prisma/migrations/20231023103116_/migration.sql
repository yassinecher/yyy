/*
  Warnings:

  - You are about to drop the column `supportduprocesseurId` on the `Processor` table. All the data in the column will be lost.
  - You are about to drop the `Supportduprocesseur` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CPUSupportId` to the `Processor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Processor" DROP CONSTRAINT "Processor_supportduprocesseurId_fkey";

-- AlterTable
ALTER TABLE "Processor" DROP COLUMN "supportduprocesseurId",
ADD COLUMN     "CPUSupportId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Supportduprocesseur";

-- AddForeignKey
ALTER TABLE "Processor" ADD CONSTRAINT "Processor_CPUSupportId_fkey" FOREIGN KEY ("CPUSupportId") REFERENCES "CPUSupport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
