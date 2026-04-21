import {
  Table,
  TableForeignKey,
  type MigrationInterface,
  type QueryRunner,
} from 'typeorm';

export class CriarTabelaPerfil1776443494213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'perfil',
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
            length: '20',
            isNullable: true,
            default: null,
          },
          {
            name: 'criado_em',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'alterado_em',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'excluido_em',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'perfil_permissao',
        columns: [
          {
            name: 'perfil_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'permissao_id',
            type: 'int',
            isNullable: false,
          },
        ],
        indices: [
          {
            name: 'PK_perfil_permissao',
            columnNames: ['perfil_id', 'permissao_id'],
            isUnique: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'perfil_permissao',
      new TableForeignKey({
        name: 'FK_perfil_permissao_perfil',
        columnNames: ['perfil_id'],
        referencedTableName: 'perfil',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'perfil_permissao',
      new TableForeignKey({
        name: 'FK_perfil_permissao_permissao',
        columnNames: ['permissao_id'],
        referencedTableName: 'permissoes',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'perfil_permissao',
      'FK_perfil_permissao_permissao',
    );
    await queryRunner.dropForeignKey(
      'perfil_permissao',
      'FK_perfil_permissao_perfil',
    );
    await queryRunner.dropTable('perfil_permissao');
    await queryRunner.dropTable('perfil');
  }
}
