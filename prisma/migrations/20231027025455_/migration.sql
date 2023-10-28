/*
  Warnings:

  - You are about to drop the `_CPUSupporttocpu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CPUSupporttocpu" DROP CONSTRAINT "_CPUSupporttocpu_A_fkey";

-- DropForeignKey
ALTER TABLE "_CPUSupporttocpu" DROP CONSTRAINT "_CPUSupporttocpu_B_fkey";

-- DropTable
DROP TABLE "_CPUSupporttocpu";

-- AddForeignKey
ALTER TABLE "Processor" ADD CONSTRAINT "Processor_cpusupportId_fkey" FOREIGN KEY ("cpusupportId") REFERENCES "CPUSupport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
