import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider_id: string;
    date: Date;
}
class CreateAppointmentService {
    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        // faz com que o agendamento só possa acontecer de hora em hora (é regra de negócio)
        const appointmentDate = startOfHour(date);

        // chama o método findByDate de AppointmentsRepository para procurar se existe um agendamento na mesma data
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        // se encontrar um appointment na mesma data retorna uma mensagem de erro
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
