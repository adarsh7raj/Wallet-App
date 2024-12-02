/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Bank_Balance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bank_Balance_userId_key" ON "Bank_Balance"("userId");
