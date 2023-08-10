import { PrismaClient } from '@prisma/client'

export let prisma: PrismaClient

export function initDb() {
    prisma = new PrismaClient()
    console.log('db connected')
}

export async function disconnectDb() {
    await prisma.$disconnect()
    console.log('db disconnected')
}
