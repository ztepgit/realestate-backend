/*
  Warnings:

  - Added the required column `agentAvatar` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agentCompany` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agentName` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agentPhone` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "agentAvatar" TEXT NOT NULL,
ADD COLUMN     "agentCompany" TEXT NOT NULL,
ADD COLUMN     "agentName" TEXT NOT NULL,
ADD COLUMN     "agentPhone" TEXT NOT NULL;
