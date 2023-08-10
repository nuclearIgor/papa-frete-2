import { prisma} from "../../../database";
import {User} from "@prisma/client";
import {CreateUserDTO} from "./user.protocols";

async function getUserById(userId: string) {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    });
}
async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
}

async function createUser({email, passwordHash, tipoDeConta}: CreateUserDTO) {
    return prisma.user.create({
        data: {
            email,
            passwordHash,
            tipoDeConta,
            activeSubscription: false
        },
        select: {
            id: true,
            email: true,
            tipoDeConta: true
        }
    })
}

async function updateUserPassword(userId: string, passwordHash: string) {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            passwordHash
        }
    })
}

export const userRepository = {
    getUserByEmail,
    createUser,
    getUserById,
    updateUserPassword
}