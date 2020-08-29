import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
// se a autenticação passar, next faz com que as próximas rotas sejam executadas
// senão a aplicação para neste middleware
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization; // pega o token no cabeçalho

    // se o token não existir
    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    // O token tem este formato: Bearer ashudruyfjdifj
    // precisamos então dividi-lo em duas partes
    // a primeira parte é o type (Bearer)
    // a segunda parte é o token
    // como não vamos utilizar a primeira variável (type),
    // podemos omiti-la inserindo apenas uma vírgula
    const [, token] = authHeader.split(' ');

    try {
        // verify vai verificar se o token é válido ou não
        // o 1º parâmetro é o token
        // o 2º é a chave
        const decoded = verify(token, authConfig.jwt.secret);

        // força o decoded a ser do tipo Payload
        const { sub } = decoded as TokenPayload;

        // diz qual é o usuário que está fazendo essa requisição
        request.user = {
            id: sub,
        };
        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
