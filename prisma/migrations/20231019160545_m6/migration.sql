/*
  Warnings:

  - A unique constraint covering the columns `[processorId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[powersupplyID]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memoryID]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gpuID]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "gpuID" TEXT,
ADD COLUMN     "memoryID" TEXT,
ADD COLUMN     "powersupplyID" TEXT,
ADD COLUMN     "processorId" TEXT;

-- CreateTable
CREATE TABLE "Processor" (
    "id" TEXT NOT NULL,
    "processorModelId" TEXT NOT NULL,
    "supportduprocesseurId" TEXT NOT NULL,

    CONSTRAINT "Processor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessorModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProcessorModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supportduprocesseur" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Supportduprocesseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memory" (
    "id" TEXT NOT NULL,
    "rgb" BOOLEAN NOT NULL,
    "marqueId" TEXT NOT NULL,
    "numberId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "frequencyId" TEXT NOT NULL,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoryMarque" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MemoryMarque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoryNumber" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "MemoryNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoryType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MemoryType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoryFrequency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MemoryFrequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Powersupply" (
    "id" TEXT NOT NULL,
    "modularity" BOOLEAN NOT NULL,
    "certification80ID" TEXT NOT NULL,
    "powersupplyMarqueID" TEXT NOT NULL,

    CONSTRAINT "Powersupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowersupplyMarque" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PowersupplyMarque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification80" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Certification80_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gpu" (
    "id" TEXT NOT NULL,
    "GpuBrandId" TEXT NOT NULL,
    "gpuArchBrandId" TEXT NOT NULL,
    "graphiccardNameId" TEXT NOT NULL,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GpuBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GpuBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GpuArchBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GpuArchBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GraphiccardName" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GraphiccardName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_processorId_key" ON "Product"("processorId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_powersupplyID_key" ON "Product"("powersupplyID");

-- CreateIndex
CREATE UNIQUE INDEX "Product_memoryID_key" ON "Product"("memoryID");

-- CreateIndex
CREATE UNIQUE INDEX "Product_gpuID_key" ON "Product"("gpuID");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_processorId_fkey" FOREIGN KEY ("processorId") REFERENCES "Processor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_powersupplyID_fkey" FOREIGN KEY ("powersupplyID") REFERENCES "Powersupply"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_memoryID_fkey" FOREIGN KEY ("memoryID") REFERENCES "Memory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_gpuID_fkey" FOREIGN KEY ("gpuID") REFERENCES "Gpu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processor" ADD CONSTRAINT "Processor_processorModelId_fkey" FOREIGN KEY ("processorModelId") REFERENCES "ProcessorModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processor" ADD CONSTRAINT "Processor_supportduprocesseurId_fkey" FOREIGN KEY ("supportduprocesseurId") REFERENCES "Supportduprocesseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_marqueId_fkey" FOREIGN KEY ("marqueId") REFERENCES "MemoryMarque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_numberId_fkey" FOREIGN KEY ("numberId") REFERENCES "MemoryNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MemoryType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_frequencyId_fkey" FOREIGN KEY ("frequencyId") REFERENCES "MemoryFrequency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Powersupply" ADD CONSTRAINT "Powersupply_certification80ID_fkey" FOREIGN KEY ("certification80ID") REFERENCES "PowersupplyMarque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Powersupply" ADD CONSTRAINT "Powersupply_powersupplyMarqueID_fkey" FOREIGN KEY ("powersupplyMarqueID") REFERENCES "Certification80"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_GpuBrandId_fkey" FOREIGN KEY ("GpuBrandId") REFERENCES "GpuBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_gpuArchBrandId_fkey" FOREIGN KEY ("gpuArchBrandId") REFERENCES "GpuArchBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_graphiccardNameId_fkey" FOREIGN KEY ("graphiccardNameId") REFERENCES "GraphiccardName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
