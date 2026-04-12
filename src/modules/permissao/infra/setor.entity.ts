import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { IPermissao } from '../permissao.type.js';

@Entity({ name: 'permissoes' })
export class PermissoesEntity implements IPermissao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nome', length: 100, nullable: false, unique: true })
  nome!: string;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao?: string;

  @CreateDateColumn({
    name: 'data_criacao',
    type: 'timestamp',
    nullable: false,
  })
  criadoEm!: Date;

  @UpdateDateColumn({
    name: 'data_atualizacao',
    type: 'timestamp',
    nullable: false,
  })
  atualizadoEm!: Date;
}
