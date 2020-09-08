import {
    ObjectID,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
class Notification {
    @ObjectIdColumn()
    id: ObjectID; // formato do mongoDB para armazenar id

    @Column()
    content: string; // mensagem

    @Column('uuid')
    recipient_id: string; // usuário que recebe a mensagem

    @Column({ default: false })
    read: boolean; // se a mensagem foi lida

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Notification;
