import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StoragedProvider/models/IStorageProvider';
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

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
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
            await this.storageProvider.deleteFile(user.avatar);
        }

        // salva o avatar
        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename;

        // save serve tanto para criar quanto atualizar
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
