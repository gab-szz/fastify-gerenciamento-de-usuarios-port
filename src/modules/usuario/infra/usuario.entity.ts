import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PerfilEntity } from '../../perfil/infra/perfil.entity.js';
import type { IUsuario } from '../usuario.type.js';

@Entity({ name: 'usuario', schema: 'public' })
export class UsuarioEntity implements IUsuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome!: string;

  @Column({ name: 'nome', type: 'date' })
  dataNascimento!: Date;

  @Column({ name: 'login', length: 100, nullable: false })
  login!: string;

  @Column({ name: 'senha', length: 255, nullable: false })
  senha!: string;

  @Column({ name: 'perfil_id', nullable: true })
  perfilId!: number;

  @JoinColumn({ name: 'perfil_id' })
  perfil!: PerfilEntity;

  @Column({ name: 'ativo', type: 'boolean', default: true })
  ativo!: boolean;

  @CreateDateColumn({ name: 'data_criacao', type: 'timestamp' })
  dataCriacao!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  dataAtualizacao!: Date;

  @Column({ name: 'data_exclusao', nullable: true })
  dataExclusao?: Date;
}
