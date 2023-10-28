/*
  Warnings:

  - A unique constraint covering the columns `[pccaseID]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[harddiskID]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "harddiskID" TEXT,
ADD COLUMN     "pccaseID" TEXT;

-- CreateTable
CREATE TABLE "PCcase" (
    "id" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "caseformatiD" TEXT NOT NULL,
    "numberofFansPreinstalledId" TEXT NOT NULL,
    "rGBTypeId" TEXT NOT NULL,

    CONSTRAINT "PCcase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PCcaseBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PCcaseBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PCcaseCaseformat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PCcaseCaseformat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PCcaseNumberofFansPreinstalled" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PCcaseNumberofFansPreinstalled_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PCcaseRGBType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PCcaseRGBType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Harddisk" (
    "id" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "capacityId" TEXT NOT NULL,
    "ComputerinterfaceId" TEXT NOT NULL,
    "DiscFormatId" TEXT NOT NULL,

    CONSTRAINT "Harddisk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HarddiskBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "HarddiskBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HarddiskType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "HarddiskType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HarddiskCapacity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "HarddiskCapacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HarddiskComputerinterface" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "HarddiskComputerinterface_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HarddiskDiscFormat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "HarddiskDiscFormat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_pccaseID_key" ON "Product"("pccaseID");

-- CreateIndex
CREATE UNIQUE INDEX "Product_harddiskID_key" ON "Product"("harddiskID");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_pccaseID_fkey" FOREIGN KEY ("pccaseID") REFERENCES "PCcase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_harddiskID_fkey" FOREIGN KEY ("harddiskID") REFERENCES "Harddisk"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCcase" ADD CONSTRAINT "PCcase_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "PCcaseBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCcase" ADD CONSTRAINT "PCcase_caseformatiD_fkey" FOREIGN KEY ("caseformatiD") REFERENCES "PCcaseCaseformat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCcase" ADD CONSTRAINT "PCcase_numberofFansPreinstalledId_fkey" FOREIGN KEY ("numberofFansPreinstalledId") REFERENCES "PCcaseNumberofFansPreinstalled"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCcase" ADD CONSTRAINT "PCcase_rGBTypeId_fkey" FOREIGN KEY ("rGBTypeId") REFERENCES "PCcaseRGBType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harddisk" ADD CONSTRAINT "Harddisk_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "HarddiskBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harddisk" ADD CONSTRAINT "Harddisk_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "HarddiskType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harddisk" ADD CONSTRAINT "Harddisk_capacityId_fkey" FOREIGN KEY ("capacityId") REFERENCES "HarddiskCapacity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harddisk" ADD CONSTRAINT "Harddisk_ComputerinterfaceId_fkey" FOREIGN KEY ("ComputerinterfaceId") REFERENCES "HarddiskComputerinterface"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harddisk" ADD CONSTRAINT "Harddisk_DiscFormatId_fkey" FOREIGN KEY ("DiscFormatId") REFERENCES "HarddiskDiscFormat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
