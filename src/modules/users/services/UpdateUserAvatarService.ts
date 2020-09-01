import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
    // eslint-disable-next-line prettier/prettier
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        // verifica se o usuário está autenticado
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        // se já possuir um avatar
        if (user.avatar) {
            // Deletar avatar anterior
            // pega o caminho do diretório e junta com o nome do arquivo
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            // verifica se o arquivo existe
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            // se o arquivo existir ele é deletado
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        // save serve tanto para criar quanto atualizar
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
