import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRespository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

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

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        // padStart(2, '0') insere um '0' à esquerda se o número não possuir dois dígitos, ficando, por exemplo 01
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                // banco Postgres possui a função 'to_char' que pode converter data em texto
                // o 'Raw' do typeorm escreve uma condição no formato raw, ou seja, um texto diretamente passado para o Postgres,
                // não vai ser interpretado pelo Typeorm, como se fosse uma query sql
                // o Typeorm muda os nomes dos campos, colocando prefixos para eles, então a função recebida em Raw pega esse nome gerado "dateFieldName"
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });
        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        // padStart(2, '0') insere um '0' à esquerda se o número não possuir dois dígitos, ficando, por exemplo 01
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                // banco Postgres possui a função 'to_char' que pode converter data em texto
                // o 'Raw' do typeorm escreve uma condição no formato raw, ou seja, um texto diretamente passado para o Postgres,
                // não vai ser interpretado pelo Typeorm, como se fosse uma query sql
                // o Typeorm muda os nomes dos campos, colocando prefixos para eles, então a função recebida em Raw pega esse nome gerado "dateFieldName"
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
        });
        return appointments;
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
