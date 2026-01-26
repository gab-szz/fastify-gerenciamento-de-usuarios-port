import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('setor')
export class SetorEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: '50',
  })
  nome!: string;

  @CreateDateColumn({
    name: 'criado_em',
    type: 'timestamptz',
  })
  criadoEm?: Date;

  @UpdateDateColumn({
    name: 'alterado_em',
    type: 'timestamptz',
    nullable: true,
  })
  alteradoEm?: Date;

  @DeleteDateColumn({
    name: 'excluido_em',
    type: 'timestamptz',
    nullable: true,
  })
  excluidoEm?: Date;
}
