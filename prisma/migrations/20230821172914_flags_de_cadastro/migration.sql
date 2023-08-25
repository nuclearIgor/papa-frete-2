-- AlterTable
ALTER TABLE "prestadores" ADD COLUMN     "cadastroDadosDoVeiculo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cadastroDadosPessoais" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cadastroEndereco" BOOLEAN NOT NULL DEFAULT false;
