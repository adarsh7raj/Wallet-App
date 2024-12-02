-- CreateTable
CREATE TABLE "Bank_Balance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "Bank_Balance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bank_Balance" ADD CONSTRAINT "Bank_Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
