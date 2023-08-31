import { prisma } from "../../../database";

async function getTokenByUserId(userId: string) {
    return prisma.resetPasswordToken.findUnique({
        where: {
            userId
        }
    })
}

async function createToken(userId: string, token: string) {
    return prisma.resetPasswordToken.create({
        data: {
            userId,
            token
        }
    })
}

async function deleteToken(tokenId: string) {
    return prisma.resetPasswordToken.delete({
        where: {
            id: tokenId
        }
    })
}

export const tokensRepository = {
    getTokenByUserId,
    createToken,
    deleteToken
}