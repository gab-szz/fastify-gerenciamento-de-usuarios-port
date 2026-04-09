import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('perfil')
export class PerfilEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 20,
    nullable: true,
    default: null,
  })
  nome!: string;

  @CreateDateColumn({
    name: 'criado_em',
    type: 'timestamptz',
  })
  criadoEm!: Date;

  @UpdateDateColumn({
    name: 'alterado_em',
    type: 'timestamp',
  })
  alteradoEm!: Date;

  @DeleteDateColumn({
    name: 'excluido_em',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  excluidoEm!: Date;
}
