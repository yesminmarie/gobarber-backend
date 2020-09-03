import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}
@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        // procura no banco se existe um email igual ao inserido pelo usuário
        const user = await this.usersRepository.findByEmail(email);

        // se não existir mostra o erro
        if (!user) {
            throw new AppError('Incorrect email/password combination', 401); // 401 usuário não autorizado
        }

        // user.password - Senha criptografada (está no banco)
        // password - Senha não-criptografada (senha que o usuário está inserindo)
        const passwordMatched = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        // se a senha não bater mostra o erro
        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401); // 401 usuário não autorizado
        }

        const { secret, expiresIn } = authConfig.jwt;

        // sabemos se a função precisa ter await passando o mouse em cima dela
        // se ela retorna uma Promise aí precisa de await. Nesse caso retorna uma string,
        // então não precisa de await.
        // 1º parâmetro é o payload -> colocar dados não sensíveis,
        // como nome, permissão do usuário, por exemplo
        // não colocar senha, email também não é recomendado
        // 2º parâmetro é uma chave secreta (nunca inseri-la no frontend) -> para gerá-la, entrar no site MD5,
        // inserir qualquer coisa e copiar a chave gerada e colá-la aqui. O token será gerado a partir desta chave
        // 3º parâmetro -> configurações do token:
        // subject -> é o id do usuário que gerou esse token
        // expiresIn: quanto tempo esse token vai durar
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
