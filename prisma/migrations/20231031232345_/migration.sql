/*
  Warnings:

  - You are about to drop the column `url` on the `Field` table. All the data in the column will be lost.
  - Added the required column `name` to the `Field` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Field" DROP COLUMN "url",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
