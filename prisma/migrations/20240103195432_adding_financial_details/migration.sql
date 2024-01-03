/*
  Warnings:

  - You are about to drop the `FINANCIALDETAILS` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FINANCIALDETAILS";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FinancialDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "balance" INTEGER NOT NULL,
    "income" INTEGER NOT NULL,
    "savings" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "FinancialDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FinancialDetails_userId_key" ON "FinancialDetails"("userId");
