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

  @CreateDateColumn({ name: "criado_em", type: "timestamptz", nullable: false })
  criadoEm!: Date;

  @UpdateDateColumn({
    name: "alterado_em",
    type: "timestamptz",
    nullable: true,
    default: null,
  })
  alteradoEm!: Date | null;

  @DeleteDateColumn({
    name: "excluido_em",
    type: "timestamp",
    nullable: true,
    default: null,
  })
  excluidoEm!: Date | null;
}
