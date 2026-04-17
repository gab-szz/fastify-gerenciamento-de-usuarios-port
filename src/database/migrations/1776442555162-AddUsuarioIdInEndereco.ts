import {
  TableColumn,
  TableForeignKey,
  type MigrationInterface,
  type QueryRunner,
} from 'typeorm';

export class AddUsuarioIdInEndereco1776442555162 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'endereco',
      new TableColumn({
        name: 'usuario_id',
        type: 'int',
        isNullable: false,
      }),
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
    await queryRunner.dropColumn('endereco', 'usuario_id');
  }
}
