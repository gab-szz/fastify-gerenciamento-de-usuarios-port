import { Table, type MigrationInterface, type QueryRunner } from 'typeorm';

export class CriarTabelaEndereco1773194418375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'endereco',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'rua',
            type: 'varchar',
            isNullable: false,
            length: '30',
          },
          {
            name: 'bairro',
            type: 'varchar',
            isNullable: false,
            length: '30',
          },
          {
            name: 'cidade',
            type: 'varchar',
            isNullable: false,
            length: '30',
          },
          {
            name: 'estado',
            type: 'varchar',
            isNullable: false,
            length: '20',
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: false,
            length: '14',
          },
          {
            name: 'criado_em',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'alterado_em',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'excluido_em',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('endereco');
  }
}
