/*
  Warnings:

  - Added the required column `link` to the `navitem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "navitem" ADD COLUMN     "link" TEXT NOT NULL;
