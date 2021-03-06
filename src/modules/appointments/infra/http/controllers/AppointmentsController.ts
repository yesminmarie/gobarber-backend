import { Request, Response } from 'express';
// a função parseISO vai converter uma string para um formato date, um objeto do JS
// startOfHour vai pegar uma data e vai colocar o minuto como 0, segundo como 0, milissegundo como 0, ou seja, inicializa tudo com 0
// isEqual verifica se duas datas são iguais
import { parseISO } from 'date-fns';

import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        // provider -> nome do profissional que vai atender
        // date -> data e horário
        const { provider_id, date } = request.body;

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            date,
            provider_id,
            user_id,
        });

        return response.json(appointment);
    }
}
