import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// registerSingleton recebe como primeiro parâmetro um id que pode ser o mesmo nome do repositório
// segundo parâmetro é o que ele retorna (AppointmentsRepository)
// <IAppointmentsRepository> garante que AppointmentsRepository tenha esse formato
// registerSingleton instancia a classe apenas uma vez, já register instancia a classe cada vez que ela é chamada
container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);