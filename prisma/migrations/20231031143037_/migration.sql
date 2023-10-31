/*
  Warnings:

  - The values [FULLSETUP] on the enum `NavLab` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NavLab_new" AS ENUM ('PCS', 'COMPONENTS', 'PEREPHRALS', 'PACKS');
ALTER TABLE "Category" ALTER COLUMN "navLab" DROP DEFAULT;
ALTER TABLE "Category" ALTER COLUMN "navLab" TYPE "NavLab_new" USING ("navLab"::text::"NavLab_new");
ALTER TYPE "NavLab" RENAME TO "NavLab_old";
ALTER TYPE "NavLab_new" RENAME TO "NavLab";
DROP TYPE "NavLab_old";
ALTER TABLE "Category" ALTER COLUMN "navLab" SET DEFAULT 'COMPONENTS';
COMMIT;
