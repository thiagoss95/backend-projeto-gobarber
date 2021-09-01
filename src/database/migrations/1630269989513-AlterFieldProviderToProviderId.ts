import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class AlterFieldProviderToProviderId1630269989513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop da campo atual - provider
    await queryRunner.dropColumn('appointments', 'provider');

    // Criação do novo campo - provider_id
    await queryRunner.addColumn('appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }));

    // Criação da ForeignKey que relaciona o provider_id com o id do user
    await queryRunner.createForeignKey('appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn('appointments',
      new TableColumn({
        name: 'provider',
        type: 'uuid',
        isNullable: true,
      }));
  }
}
