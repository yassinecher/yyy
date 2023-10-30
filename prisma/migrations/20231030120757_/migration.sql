-- CreateTable
CREATE TABLE "_MotherboardToPCcaseProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GpuToPCcaseProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MotherboardToPCcaseProfile_AB_unique" ON "_MotherboardToPCcaseProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_MotherboardToPCcaseProfile_B_index" ON "_MotherboardToPCcaseProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GpuToPCcaseProfile_AB_unique" ON "_GpuToPCcaseProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_GpuToPCcaseProfile_B_index" ON "_GpuToPCcaseProfile"("B");

-- AddForeignKey
ALTER TABLE "_MotherboardToPCcaseProfile" ADD CONSTRAINT "_MotherboardToPCcaseProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Motherboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MotherboardToPCcaseProfile" ADD CONSTRAINT "_MotherboardToPCcaseProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "PCcaseProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GpuToPCcaseProfile" ADD CONSTRAINT "_GpuToPCcaseProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Gpu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GpuToPCcaseProfile" ADD CONSTRAINT "_GpuToPCcaseProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "PCcaseProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
