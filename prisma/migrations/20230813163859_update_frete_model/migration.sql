/*
  Warnings:

  - You are about to drop the column `oferece` on the `fretes` table. All the data in the column will be lost.
  - Added the required column `janelaColeta` to the `fretes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `janelaEntrega` to the `fretes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ofereceCarga` to the `fretes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ofereceDescarga` to the `fretes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oferecePedagio` to the `fretes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oferecePernoite` to the `fretes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reaisPorKm` to the `fretes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visivel` to the `fretes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fretes" DROP COLUMN "oferece",
ADD COLUMN     "janelaColeta" TEXT NOT NULL,
ADD COLUMN     "janelaEntrega" TEXT NOT NULL,
ADD COLUMN     "ofereceCarga" BOOLEAN NOT NULL,
ADD COLUMN     "ofereceDescarga" BOOLEAN NOT NULL,
ADD COLUMN     "oferecePedagio" BOOLEAN NOT NULL,
ADD COLUMN     "oferecePernoite" BOOLEAN NOT NULL,
ADD COLUMN     "reaisPorKm" TEXT NOT NULL,
ADD COLUMN     "visivel" BOOLEAN NOT NULL;
