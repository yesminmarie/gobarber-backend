import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment'; // importa o modelo de Appointment

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        // procura se existe no banco de dados um appointment que possua uma data
        // igual a data passada por parâmetro
        const findAppointment = await this.findOne({
            where: { date }, // short sintax para {date: date}
        });

        // retorna o Appointment caso encontre, se não encontrar retorna nulo (null)
        return findAppointment || null;
    }
}

export default AppointmentsRepository;
