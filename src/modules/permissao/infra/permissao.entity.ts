import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import type { PermissaoType } from '../permissao.type.js';
import type { PerfilEntity } from '../../perfil/infra/perfil.entity.js';

@Entity({ name: 'permissoes' })
export class PermissaoEntity implements PermissaoType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  nome!: string;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao?: string;

  @ManyToMany('PerfilEntity', (perfil: PerfilEntity) => perfil.permissoes)
  perfis!: PerfilEntity[];

  @CreateDateColumn({
    name: 'data_criacao',
    type: 'timestamp',
    nullable: false,
  })
  criadoEm!: Date;

  @UpdateDateColumn({
    name: 'data_atualizacao',
    type: 'timestamp',
    nullable: true,
  })
  atualizadoEm?: Date;
}
