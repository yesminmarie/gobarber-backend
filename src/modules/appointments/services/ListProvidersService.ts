import { injectable, inject } from 'tsyringe';

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

            console.log('A query no banco foi feita');

            await this.cacheProvider.save(`providers-list:${user_id}`, users);
        }

        return users;
    }
}

export default ListProviderService;
