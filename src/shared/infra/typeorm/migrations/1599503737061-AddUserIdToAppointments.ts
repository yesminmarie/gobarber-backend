import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1599503737061
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true, // define como nulo, pois se um cliente for deletado, o prestador de serviços terá um histórico de agendamentos deste cliente
            }),
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentUser', // nome da ForeignKey
                columnNames: ['user_id'], // coluna que vai receber a chave estrangeira
                referencedColumnNames: ['id'],
                referencedTableName: 'users', // tabela referênciada (users)
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ordem reversa do método up
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider'); // apaga a chave estrangeira

        await queryRunner.dropColumn('appointments', 'user_id'); // deleta a coluna user_id
    }
}
