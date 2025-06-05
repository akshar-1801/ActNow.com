/*
  Warnings:

  - The primary key for the `Multimedia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `title` on the `Multimedia` table. All the data in the column will be lost.
  - Added the required column `publicId` to the `Multimedia` table without a default value. This is not possible if the table is not empty.
  - Made the column `projectId` on table `Multimedia` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Multimedia" DROP CONSTRAINT "Multimedia_projectId_fkey";

-- AlterTable
ALTER TABLE "Multimedia" DROP CONSTRAINT "Multimedia_pkey",
DROP COLUMN "title",
ADD COLUMN     "publicId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "projectId" SET NOT NULL,
ADD CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Multimedia_id_seq";

-- AddForeignKey
ALTER TABLE "Multimedia" ADD CONSTRAINT "Multimedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
