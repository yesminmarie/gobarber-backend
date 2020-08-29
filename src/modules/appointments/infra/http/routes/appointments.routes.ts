import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

// a função parseISO vai converter uma string para um formato date, um objeto do JS
// startOfHour vai pegar uma data e vai colocar o minuto como 0, segundo como 0, milissegundo como 0, ou seja, inicializa tudo com 0
// isEqual verifica se duas datas são iguais
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// aplica esse middleware em todas as rotas de agendamentos
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    // provider -> nome do profissional que vai atender
    // date -> data e horário
    const { provider_id, date } = request.body;

    // apenas transforma uma string em objeto Date (não é regra de negócio)
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
