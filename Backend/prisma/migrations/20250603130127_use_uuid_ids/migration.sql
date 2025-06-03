/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "category" TEXT,
    "image" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Multimedia" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "projectId" TEXT,

    CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Multimedia" ADD CONSTRAINT "Multimedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
