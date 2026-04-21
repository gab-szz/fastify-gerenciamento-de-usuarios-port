import {
  Table,
  TableForeignKey,
  type MigrationInterface,
  type QueryRunner,
} from 'typeorm';

export class CriarTabelaUsuario1776443500000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuario',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'login',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'senha',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'data_nascimento',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'setor_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'perfil_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ativo',
            type: 'boolean',
            isNullable: false,
            default: true,
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
      'usuario',
      new TableForeignKey({
        name: 'FK_usuario_setor',
        columnNames: ['setor_id'],
        referencedTableName: 'setor',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'usuario',
      new TableForeignKey({
        name: 'FK_usuario_perfil',
        columnNames: ['perfil_id'],
        referencedTableName: 'perfil',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('usuario', 'FK_usuario_perfil');
    await queryRunner.dropForeignKey('usuario', 'FK_usuario_setor');
    await queryRunner.dropTable('usuario');
  }
}
