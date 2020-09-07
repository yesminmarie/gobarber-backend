import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '../entities/User'; // importa o modelo de User

class UsersRepository implements IUsersRepository {
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

    public async findAllProviders({
        except_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];

        if (except_user_id) {
            // se existir except_user_id, lista todos os usuários menos o que possui except_user_id
            users = await this.ormRepository.find({
                where: {
                    id: Not(except_user_id),
                },
            });
        } else {
            // se não exisitir except_user_id, lista todos os usuários
            users = await this.ormRepository.find();
        }

        return users;
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
