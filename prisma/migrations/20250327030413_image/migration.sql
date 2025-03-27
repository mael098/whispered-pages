-- DropForeignKey
ALTER TABLE "Imagen" DROP CONSTRAINT "Imagen_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Imagen" DROP CONSTRAINT "Imagen_user_id_fkey";

-- AlterTable
ALTER TABLE "Imagen" ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "book_id" DROP NOT NULL,
ADD CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Lib"("id") ON DELETE SET NULL ON UPDATE CASCADE;
