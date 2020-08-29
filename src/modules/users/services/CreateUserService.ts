// utiliza o getRepository do typeorm,
// não necessitando criar um repositório para User
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User); // passa o User para getRepository

        // verifica se o email é duplicado
        const checkUserExists = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        // criptografia da senha
        const hashedPassword = await hash(password, 8); // senha de tamanho 8

        // cria a instância da classe User mas não salva no banco, por isso não é await
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user); // salva no banco, por isso é await

        return user;
    }
}

export default CreateUserService;
