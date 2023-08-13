import {userRepository} from "./users.repository";
import {RegisterDTO} from "./user.protocols";

import { hash } from 'bcrypt'
import {ApplicationError} from "../common/applicationError";

async function createUser({email, senha, tipoDeConta}: RegisterDTO) {
    let user = await userRepository.getUserByEmail(email)
    if (user !== null) {
        throw new ApplicationError('email taken', 409)
    }

    const passwordHash = await hash(senha, 12)
    
    return await userRepository.createUser({email, passwordHash, tipoDeConta})
}

export const userService = {
    createUser
}