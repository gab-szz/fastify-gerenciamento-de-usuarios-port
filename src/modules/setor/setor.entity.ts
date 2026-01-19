import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("setor")
export class SetorEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "nome",
    type: "varchar",
    length: "50",
  })
  nome!: string;

  // O TypeORM preencherá automaticamente no INSERT se o valor for nulo
  @CreateDateColumn({
    name: "criado_em",
    type: "timestamptz",
  })
  criadoEm!: Date;

  // Como o seu Domínio gera um "new Date()", o TypeORM persistirá esse valor exato
  @UpdateDateColumn({
    name: "alterado_em",
    type: "timestamptz",
    nullable: true,
  })
  alteradoEm!: Date | null;

  // Importante: mudei para timestamptz para manter o padrão das outras colunas
  @DeleteDateColumn({
    name: "excluido_em",
    type: "timestamptz",
    nullable: true,
  })
  excluidoEm!: Date | null;
}
