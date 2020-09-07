import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

// @injectable() indica que a classe vai receber injeção de dependências
@injectable()
class CreateAppointmentService {
    constructor(
        // injeta o repositório
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
        user_id,
    }: IRequest): Promise<Appointment> {
        // faz com que o agendamento só possa acontecer de hora em hora (é regra de negócio)
        const appointmentDate = startOfHour(date);

        // chama o método findByDate de AppointmentsRepository para procurar se existe um agendamento na mesma data
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        // se encontrar um appointment na mesma data retorna uma mensagem de erro
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
