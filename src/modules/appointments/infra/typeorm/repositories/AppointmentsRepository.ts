import { getRepository, Repository } from 'typeorm';

import IAppointmentsRespository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment'; // importa o modelo de Appointment

class AppointmentsRepository implements IAppointmentsRespository {
    // a variável ormRepository é um repositorio do TypeORM da entidade de Appointment
    private ormRepository: Repository<Appointment>;

    constructor() {
        // getRepository cria o respositório
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        // procura se existe no banco de dados um appointment que possua uma data
        // igual a data passada por parâmetro
        const findAppointment = await this.ormRepository.findOne({
            where: { date }, // short sintax para {date: date}
        });

        // retorna o Appointment caso encontre, se não encontrar retorna nulo (null)
        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        // cria o appointment
        const appointment = this.ormRepository.create({ provider_id, date });

        // salva no banco
        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
