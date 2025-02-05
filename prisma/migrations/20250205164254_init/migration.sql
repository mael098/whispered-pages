-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "alias" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "libID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lib" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "lib_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeLib" (
    "id" SERIAL NOT NULL,
    "libID" INTEGER NOT NULL,

    CONSTRAINT "LikeLib_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibCategory" (
    "id" SERIAL NOT NULL,
    "libId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "LibCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankingLib" (
    "id" SERIAL NOT NULL,
    "libID" INTEGER NOT NULL,
    "ranking" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RankingLib_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_correo_key" ON "User"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "lib_title_key" ON "lib"("title");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_libID_fkey" FOREIGN KEY ("libID") REFERENCES "lib"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lib" ADD CONSTRAINT "lib_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeLib" ADD CONSTRAINT "LikeLib_libID_fkey" FOREIGN KEY ("libID") REFERENCES "lib"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibCategory" ADD CONSTRAINT "LibCategory_libId_fkey" FOREIGN KEY ("libId") REFERENCES "lib"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibCategory" ADD CONSTRAINT "LibCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingLib" ADD CONSTRAINT "RankingLib_libID_fkey" FOREIGN KEY ("libID") REFERENCES "lib"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
