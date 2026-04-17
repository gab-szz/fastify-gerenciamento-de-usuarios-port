import { Table, type MigrationInterface, type QueryRunner } from 'typeorm';

export class CriarTabelaUsuario1776442555161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuario',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
            length: '50',
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuario');
  }
}
