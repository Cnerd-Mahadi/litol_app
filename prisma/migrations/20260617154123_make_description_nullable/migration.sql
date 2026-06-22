-- AlterTable
ALTER TABLE "note" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "summary" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_NoteToSummary" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_NoteToSummary_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NoteToSummary_B_index" ON "_NoteToSummary"("B");

-- AddForeignKey
ALTER TABLE "_NoteToSummary" ADD CONSTRAINT "_NoteToSummary_A_fkey" FOREIGN KEY ("A") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NoteToSummary" ADD CONSTRAINT "_NoteToSummary_B_fkey" FOREIGN KEY ("B") REFERENCES "summary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
