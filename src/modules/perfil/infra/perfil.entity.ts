import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PermissaoEntity } from '../../permissao/infra/permissao.entity.js';

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

  @ManyToMany(() => PermissaoEntity, (permissao) => permissao.perfis)
  @JoinTable({
    name: 'perfil_permissao',
    joinColumn: { name: 'perfil_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissao_id', referencedColumnName: 'id' },
  })
  permissoes!: PermissaoEntity[];

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
