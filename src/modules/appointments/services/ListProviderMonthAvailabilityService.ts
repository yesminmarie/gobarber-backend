import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id,
                year,
                month,
            },
        );

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        // cria um array contendo todos os dias do mês
        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + 1,
        );

        // verifica se exisite agendamentos em cada dia do mês
        const availability = eachDayArray.map(day => {
            // compareDate será usada para verificar se a data passada pelo usuário é após a data atual
            const compareDate = new Date(year, month - 1, day, 23, 59, 59);

            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            return {
                day, // vai retornar true se a data atual for após a data passada pelo usuário e se o número de agendamentos for menor 10 (que é a quantidade máxima possível de agendamentos no dia)
                available:
                    isAfter(compareDate, new Date()) &&
                    appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;
