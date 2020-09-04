import { getRepository, Repository } from 'typeorm';

import IUserTokensRespository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../entities/UserToken'; // importa o modelo de User

class UserTokensRepository implements IUserTokensRespository {
    // a variável ormRepository é um repositorio do TypeORM da entidade de User
    private ormRepository: Repository<UserToken>;

    constructor() {
        // getRepository cria o repositório
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token },
        });

        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            user_id,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;
