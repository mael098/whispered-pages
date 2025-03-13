/*
  Warnings:

  - Added the required column `imagen` to the `Lib` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lib" ADD COLUMN     "imagen" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Autor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AutorToBook" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AutorToBook_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AutorToBook_B_index" ON "_AutorToBook"("B");

-- AddForeignKey
ALTER TABLE "_AutorToBook" ADD CONSTRAINT "_AutorToBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Autor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AutorToBook" ADD CONSTRAINT "_AutorToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "Lib"("id") ON DELETE CASCADE ON UPDATE CASCADE;
