-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "authorId" TEXT,
ALTER COLUMN "completed" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
