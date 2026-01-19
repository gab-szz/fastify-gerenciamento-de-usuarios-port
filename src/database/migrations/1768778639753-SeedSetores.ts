import type { MigrationInterface, QueryRunner } from "typeorm";
import { env } from "../../config/env.js";

export class SeedSetores1768778639753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (env.AMBIENTE === "DEV" || env.AMBIENTE === "TEST") {
      await queryRunner.query(
        `INSERT INTO setor (nome) VALUES ('Tecnologia da Informação')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (env.AMBIENTE === "DEV" || env.AMBIENTE === "TEST") {
      await queryRunner.query(
        `DELETE FROM setor WHERE nome = 'Tecnologia da Informação'`,
      );
    }
  }
}
