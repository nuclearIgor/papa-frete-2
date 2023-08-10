import * as crypto from "crypto";
import {loginDTO} from "./auth.protocols";
import {userRepository} from "../users/users.repository";
import {ApplicationError} from "../common/applicationError";
import {compare, hash} from "bcrypt";
import { sign } from 'jsonwebtoken'
import {User} from "@prisma/client";

async function login({email, senha}: loginDTO) {
    const user = await userRepository.getUserByEmail(email)

    if(!user) {
        throw new ApplicationError('wrong user', 401)
    }

    const passwordMatches = await compare(senha, user.passwordHash)
    if(!passwordMatches) {
        throw new ApplicationError('bad credentials', 401)
    }

    const payload = {
        sub: user.id
    }

    // @ts-ignore
    const token = await sign(payload, process.env.JWT_SECRET, {expiresIn: '2 days'})

    return {
        token,
        userData: {
            email: user.email,
            tipoDeConta: user.tipoDeConta,
        }
    }

    // const older_token = await sign({ sub: user.id, iat: Math.floor(Date.now() / 1000) - 359 }, process.env.JWT_SECRET, {expiresIn: '1 minute'});
    // return older_token
}

export const authService = {
    login
}