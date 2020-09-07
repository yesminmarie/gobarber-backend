import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
        day,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                year,
                month,
                day,
            },
        );

        const hourStart = 8; // horário que começa os atendimentos

        const eachHourArray = Array.from(
            { length: 10 }, // 10 atendimentos por dia (no máximo)
            (_, index) => index + hourStart,
        );

        const currentDate = new Date(Date.now());

        // procura se existe agendamentos no horário informado
        const availability = eachHourArray.map(hour => {
            const hasAppointmentInHour = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );

            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                // se não exisir um agendamento, e a data e horário for depois da data atual, available será true, senão será false
                available:
                    !hasAppointmentInHour && isAfter(compareDate, currentDate),
            };
        });

        return availability;
    }
}

export default ListProviderDayAvailabilityService;
