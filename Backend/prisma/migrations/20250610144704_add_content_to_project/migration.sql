/*
  Warnings:

  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.
  - Added the required column `content` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Multimedia" DROP CONSTRAINT "Multimedia_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "image",
ADD COLUMN     "content" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "date" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Multimedia" ADD CONSTRAINT "Multimedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
