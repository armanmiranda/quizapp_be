/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "correctAnswer" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctAnswer";
