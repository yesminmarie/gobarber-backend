import { Request, Response } from 'express';
// a função parseISO vai converter uma string para um formato date, um objeto do JS
// startOfHour vai pegar uma data e vai colocar o minuto como 0, segundo como 0, milissegundo como 0, ou seja, inicializa tudo com 0
// isEqual verifica se duas datas são iguais
import { parseISO } from 'date-fns';

import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';

export default class AppointmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // provider -> nome do profissional que vai atender
        // date -> data e horário
        const { provider_id, date } = request.body;

        // apenas transforma uma string em objeto Date (não é regra de negócio)
        const parsedDate = parseISO(date);

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
        });

        return response.json(appointment);
    }
}
