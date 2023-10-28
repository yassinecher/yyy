-- DropForeignKey
ALTER TABLE "Processor" DROP CONSTRAINT "Processor_cpusupportId_fkey";

-- CreateTable
CREATE TABLE "_CPUSupporttocpu" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CPUSupporttocpu_AB_unique" ON "_CPUSupporttocpu"("A", "B");

-- CreateIndex
CREATE INDEX "_CPUSupporttocpu_B_index" ON "_CPUSupporttocpu"("B");

-- AddForeignKey
ALTER TABLE "_CPUSupporttocpu" ADD CONSTRAINT "_CPUSupporttocpu_A_fkey" FOREIGN KEY ("A") REFERENCES "CPUSupport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CPUSupporttocpu" ADD CONSTRAINT "_CPUSupporttocpu_B_fkey" FOREIGN KEY ("B") REFERENCES "Processor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
