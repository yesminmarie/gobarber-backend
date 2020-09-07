import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            user_id: '123123',
            provider_id: '123123',
        });

        expect(appointment).toHaveProperty('id'); // espera que o appointment possua um id
        expect(appointment.provider_id).toBe('123123'); // espera que o provider_id seja 123123
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11); // 10 de maio de 2020 às 11h (4 -> maio, 0 -> janeiro)

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '123123',
            provider_id: '123123',
        });

        // espera que essa função seja rejeitada e retorne um erro e esse erro seja uma instância de AppError
        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: '123123',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
