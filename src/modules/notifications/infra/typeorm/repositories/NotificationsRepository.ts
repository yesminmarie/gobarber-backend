import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
    // a variável ormRepository é um repositorio do TypeORM da entidade de Appointment
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        // getRepository cria o respositório
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({
        content,
        recipient_id,
    }: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({
            content,
            recipient_id,
        });

        // salva no banco
        await this.ormRepository.save(notification);

        return notification;
    }
}

export default NotificationsRepository;
