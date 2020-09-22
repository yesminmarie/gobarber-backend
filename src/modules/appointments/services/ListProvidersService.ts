import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
}
@injectable()
class ListProviderService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        // verifica se existe dados no cache que possuam a chave "providers-list:${user_id}"
        let users = await this.cacheProvider.recover<User[]>(
            `providers-list:${user_id}`,
        );

        // se não existir, carrega do banco
        if (!users) {
            // listar todos os usuários menos o que está logado
            users = await this.usersRepository.findAllProviders({
                except_user_id: user_id,
            });

            await this.cacheProvider.save(
                `providers-list:${user_id}`,
                classToClass(users),
            );
        }

        return users;
    }
}

export default ListProviderService;
