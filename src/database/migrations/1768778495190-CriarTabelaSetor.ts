import { Table, type MigrationInterface, type QueryRunner } from "typeorm";

export class CriarTabelaSetor1768778495190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "setor",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "nome",
            type: "varchar",
            length: "50",
          },
          {
            name: "criado_em",
            type: "timestamptz",
            default: "now()",
          },
          {
            name: "alterado_em",
            type: "timestamptz",
            isNullable: true,
          },
          {
            name: "excluido_em",
            type: "timestamptz",
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("setor");
  }
}
