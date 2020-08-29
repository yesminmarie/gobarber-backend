import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1594077137291
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        // isNullable: false, //não é necessário, por padrão é false
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                    },
                    {
                        name: 'created_at', // quando que o usuário foi criado
                        type: 'timestamp',
                        default: 'now()', // executa uma função para pegar o horário do momento
                    },
                    {
                        name: 'updated_at', // quando que o usuário foi atualizado
                        type: 'timestamp',
                        default: 'now()', // executa uma função para pegar o horário do momento
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments'); // deleta a tabela
    }
}
