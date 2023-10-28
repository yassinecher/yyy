-- CreateTable
CREATE TABLE "Image2" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image2_manufacturerId_key" ON "Image2"("manufacturerId");

-- AddForeignKey
ALTER TABLE "Image2" ADD CONSTRAINT "Image2_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
