import { getRepository, Repository } from 'typeorm';

import IUsersRespository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User'; // importa o modelo de User

class UsersRepository implements IUsersRespository {
    // a variável ormRepository é um repositorio do TypeORM da entidade de User
    private ormRepository: Repository<User>;

    constructor() {
        // getRepository cria o repositório
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        // cria o user
        const user = this.ormRepository.create(userData);

        // salva no banco
        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
