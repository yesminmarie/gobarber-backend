import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1594420670577 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true, // garante que o e-mail seja único
                    },
                    {
                        name: 'password',
                        type: 'varchar',
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
        await queryRunner.dropTable('users'); // deleta a tabela
    }
}
