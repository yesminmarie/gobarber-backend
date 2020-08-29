import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
// toda rota que começa com o prefixo 'files'
// o que vem depois dela será servido de forma estática (nome do arquivo)
// serve uma pasta de forma estática
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// _ (underline) diz para o eslint que essa variável não será utilizada (seria o next)
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    // verifica se o erro é uma instância da classe AppError
    // se for, quer dizer que é um erro que foi originado pela minha aplicação
    // ou seja, é um erro conhecido
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    // se não for um erro conhecido, retorna um erro mais genérico
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
