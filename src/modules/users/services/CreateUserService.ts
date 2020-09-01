import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    // eslint-disable-next-line prettier/prettier
    constructor(private usersRepository: IUsersRepository) { }

    public async execute({ name, email, password }: IRequest): Promise<User> {
        // verifica se o email é duplicado
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        // criptografia da senha
        const hashedPassword = await hash(password, 8); // senha de tamanho 8

        // cria a instância da classe User mas não salva no banco, por isso não é await
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
