-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "tipoDeConta" TEXT NOT NULL,
    "activeSubscription" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionTier" TEXT,
    "cadastroCompleto" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tomadores" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "cnpj" TEXT,
    "nomeFantasia" TEXT,
    "ramo" TEXT,
    "nomeDoContato" TEXT,
    "telefone" TEXT,
    "cep" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "complemento" TEXT,

    CONSTRAINT "tomadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prestadores" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "nome" TEXT,
    "cpf" TEXT,
    "telefone" TEXT,
    "cnh" TEXT,
    "categoriaCNH" TEXT,
    "tipoDoVeiculo" TEXT,
    "tipoDaCarroceria" TEXT,
    "anoDeFabricacaoDoVeiculo" TEXT,

    CONSTRAINT "prestadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fretes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tomadorId" TEXT NOT NULL,
    "coleta" TEXT NOT NULL,
    "entrega" TEXT NOT NULL,
    "oferece" TEXT NOT NULL,
    "ufOrigem" TEXT NOT NULL,
    "cidadeOrigem" TEXT NOT NULL,
    "ufDestino" TEXT NOT NULL,
    "cidadeDestino" TEXT NOT NULL,
    "tipoDeCarga" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "veiculoAlvo" TEXT NOT NULL,
    "carroceriaAlvo" TEXT NOT NULL,

    CONSTRAINT "fretes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidaturas" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "freteId" TEXT NOT NULL,
    "prestadorId" TEXT NOT NULL,
    "aceita" BOOLEAN,
    "aceitaEm" TIMESTAMP(3),
    "contratada" BOOLEAN NOT NULL DEFAULT false,
    "contratadaEm" TIMESTAMP(3),
    "concluida" BOOLEAN NOT NULL DEFAULT false,
    "concluidaEm" TIMESTAMP(3),

    CONSTRAINT "candidaturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anotacao_candidatura" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "candidaturaId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "anotacao_candidatura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_id_idx" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tomadores_userId_key" ON "tomadores"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tomadores_cnpj_key" ON "tomadores"("cnpj");

-- CreateIndex
CREATE INDEX "tomadores_cnpj_idx" ON "tomadores"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "prestadores_userId_key" ON "prestadores"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "prestadores_cpf_key" ON "prestadores"("cpf");

-- CreateIndex
CREATE INDEX "prestadores_cpf_idx" ON "prestadores"("cpf");

-- CreateIndex
CREATE INDEX "fretes_tomadorId_idx" ON "fretes"("tomadorId");

-- CreateIndex
CREATE INDEX "candidaturas_freteId_idx" ON "candidaturas"("freteId");

-- CreateIndex
CREATE INDEX "candidaturas_prestadorId_idx" ON "candidaturas"("prestadorId");

-- CreateIndex
CREATE INDEX "anotacao_candidatura_candidaturaId_idx" ON "anotacao_candidatura"("candidaturaId");

-- AddForeignKey
ALTER TABLE "tomadores" ADD CONSTRAINT "tomadores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestadores" ADD CONSTRAINT "prestadores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fretes" ADD CONSTRAINT "fretes_tomadorId_fkey" FOREIGN KEY ("tomadorId") REFERENCES "tomadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidaturas" ADD CONSTRAINT "candidaturas_freteId_fkey" FOREIGN KEY ("freteId") REFERENCES "fretes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidaturas" ADD CONSTRAINT "candidaturas_prestadorId_fkey" FOREIGN KEY ("prestadorId") REFERENCES "prestadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anotacao_candidatura" ADD CONSTRAINT "anotacao_candidatura_candidaturaId_fkey" FOREIGN KEY ("candidaturaId") REFERENCES "candidaturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
