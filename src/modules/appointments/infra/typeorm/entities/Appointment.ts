// esse arquivo será a entidade de agendamento,
// esse arquivo descreve um agendamento

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // quando não passa nenhum parâmetro, por padrão é string
    provider_id: string;

    // muitos agendamentos para um usuário
    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' }) // coluna que vai identificar qual é o usuário prestador do serviço
    provider: User; // propriedade. Instância da classe User

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;
