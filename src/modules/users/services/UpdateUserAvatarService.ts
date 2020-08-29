import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const userRepository = getRepository(User);

        // verifica se o usuário está autenticado
        const user = await userRepository.findOne(user_id);

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
        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
