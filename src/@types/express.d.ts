// vai sobrescrever uma tipagem de dentro do Express
declare namespace Express {
    // sobrescreve a exportação do Request, faz uma anexo
    // adiciona uma informação nova dentro de Request, no caso
    // que é o usuário e dentro dele temos um id
    export interface Request {
        user: {
            id: string;
        };
    }
}
