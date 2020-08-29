import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1594425333235
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true, // define como nulo, pois se um prestador de serviço for deletado, os usuários que ele atendeu não serão apagados, mas terão um atendente nulo
            }),
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider', // nome da ForeignKey
                columnNames: ['provider_id'], // coluna que vai receber a chave estrangeira
                referencedColumnNames: ['id'], // coluna na tabela usuário que vai representar o provider_id
                referencedTableName: 'users', // tabela referênciada (users)
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ordem reversa do método up
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider'); // apaga a chave estrangeira

        await queryRunner.dropColumn('appointments', 'provider_id'); // deleta a coluna provider_id

        // cria novamente a coluna provider
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }
}
