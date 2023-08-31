import * as crypto from "crypto";
import {loginDTO, mudarSenhaDTO} from "./auth.protocols";
import {userRepository} from "../users/users.repository";
import {ApplicationError} from "../common/applicationError";
import {compare, hash} from "bcrypt";
import { sign } from 'jsonwebtoken'
import {prestadorRepository} from "../prestadores/prestadores.repository";
import {tomadorRepository} from "../tomadores/tomadores.repository";
import {tokensRepository} from "./tokens.repository";
import {mailService} from "../common/mail/mail";

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

    let userData

    if (user.tipoDeConta === 'prestador') {
        userData = await prestadorRepository.getPrestadorByUserId(user.id)
    }

    if (user.tipoDeConta === 'tomador') {
        userData = await tomadorRepository.getTomadorByUserId(user.id)
    }

    return {
        token,
        email: user.email,
        tipoDeConta: user.tipoDeConta,
        userData: {...userData}
    }

    // const older_token = await sign({ sub: user.id, iat: Math.floor(Date.now() / 1000) - 359 }, process.env.JWT_SECRET, {expiresIn: '1 minute'});
    // return older_token
}

async function changePassword(userId: string, {senhaAtual, novaSenha}: mudarSenhaDTO) {
    const user = await userRepository.getUserById(userId)

    if(!user) {
        throw new ApplicationError('wrong user', 401)
    }

    const passwordMatches = await compare(senhaAtual, user.passwordHash)
    if(!passwordMatches) {
        throw new ApplicationError('senha incorreta', 401)
    }

    const passwordHash = await hash(novaSenha, 12)
    await userRepository.updateUserPassword(userId, passwordHash)
}

async function passwordResetRequestToken(email: string, host: string | undefined) {
    const user = await userRepository.getUserByEmail(email)

    if (!user) {
        throw new ApplicationError('user not found', 400)
    }

    const token = await tokensRepository.getTokenByUserId(user.id)
    if(token) {
        await tokensRepository.deleteToken(token.id)
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashToken = await hash(resetToken, 12)

    await tokensRepository.createToken(user.id, hashToken)

    const link = `${host}/password-reset?token=${resetToken}&id=${user.id}`
    console.log('link: ', link)
    await mailService.sendTokenMail(user.email, link)
    return link
}

async function resetPassword(token: string, userId: string, password: string) {
    const passwordResetToken = await tokensRepository.getTokenByUserId(userId)
    if(!passwordResetToken) {
        throw new ApplicationError('invalid or expired token', 400)
    }

    const isValidToken = await compare(token, passwordResetToken.token)
    if(!isValidToken) {
        throw new ApplicationError('invalid or expired token', 400)
    }

    const passwordHash = await hash(password, 12)

    const user = await userRepository.getUserById(userId)
    if(!user) {
        throw new ApplicationError('invalid user', 400)
    }

    await userRepository.updateUserPassword(user.id, passwordHash)
    await tokensRepository.deleteToken(passwordResetToken.id)
}

export const authService = {
    login,
    changePassword,
    passwordResetRequestToken,
    resetPassword
}