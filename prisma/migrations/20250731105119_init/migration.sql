/*
  Warnings:

  - Made the column `amountAlreadyPaid` on table `contracts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."contracts" ALTER COLUMN "amountAlreadyPaid" SET NOT NULL;
