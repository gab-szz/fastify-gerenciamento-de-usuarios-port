import {
  Table,
  TableForeignKey,
  type MigrationInterface,
  type QueryRunner,
} from 'typeorm';

export class CriarTabelaEndereco1776443510000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'endereco',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'rua',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'numero',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'bairro',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'cidade',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'estado',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'cep',
            type: 'varchar',
            length: '14',
            isNullable: false,
          },
          {
            name: 'complemento',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'usuario_id',
            type: 'int',
            isNullable: false,
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
      true,
    );

    await queryRunner.createForeignKey(
      'endereco',
      new TableForeignKey({
        name: 'FK_endereco_usuario',
        columnNames: ['usuario_id'],
        referencedTableName: 'usuario',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('endereco', 'FK_endereco_usuario');
    await queryRunner.dropTable('endereco');
  }
}
