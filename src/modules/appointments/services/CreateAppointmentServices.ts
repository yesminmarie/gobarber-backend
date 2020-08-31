import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
}
class CreateAppointmentService {
    constructor(private appointmentsRepository: IAppointmentsRepository) { }

    public async execute({
        date,
        provider_id,
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
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
