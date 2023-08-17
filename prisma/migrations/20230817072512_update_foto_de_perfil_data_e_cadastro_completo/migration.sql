-- AlterTable
ALTER TABLE "prestadores" ADD COLUMN     "cadastroCompleto" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fotoDePerfilData" TEXT;

-- AlterTable
ALTER TABLE "tomadores" ADD COLUMN     "cadastroCompleto" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fotoDePerfilData" TEXT;

-- CreateIndex
CREATE INDEX "prestadores_userId_idx" ON "prestadores"("userId");

-- CreateIndex
CREATE INDEX "tomadores_userId_idx" ON "tomadores"("userId");
