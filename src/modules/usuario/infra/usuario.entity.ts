import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PerfilEntity } from '../../perfil/infra/perfil.entity.js';
import { SetorEntity } from '../../setor/infra/setor.entity.js';
import { EnderecoEntity } from '../../endereco/infra/endereco.entity.js';
import type { IUsuario } from '../usuario.type.js';

@Entity({ name: 'usuario', schema: 'public' })
export class UsuarioEntity implements IUsuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nome', type: 'varchar', length: 50, nullable: false })
  nome!: string;

  @Column({ name: 'data_nascimento', type: 'date', nullable: true })
  dataNascimento!: Date;

  @Column({ name: 'login', type: 'varchar', length: 100, nullable: false })
  login!: string;

  @Column({ name: 'senha', type: 'varchar', length: 255, nullable: false })
  senha!: string;

  @Column({ name: 'setor_id', type: 'int', nullable: false })
  setorId!: number;

  @ManyToOne(() => SetorEntity)
  @JoinColumn({ name: 'setor_id' })
  setor!: SetorEntity;

  @Column({ name: 'perfil_id', type: 'int', nullable: true })
  perfilId!: number;

  @ManyToOne(() => PerfilEntity)
  @JoinColumn({ name: 'perfil_id' })
  perfil!: PerfilEntity;

  @OneToMany(() => EnderecoEntity, (endereco) => endereco.usuario)
  enderecos!: EnderecoEntity[];

  @Column({ name: 'ativo', type: 'boolean', default: true })
  ativo!: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  dataCriacao!: Date;

  @UpdateDateColumn({
    name: 'alterado_em',
    type: 'timestamptz',
    nullable: true,
  })
  dataAtualizacao!: Date;

  @DeleteDateColumn({
    name: 'excluido_em',
    type: 'timestamptz',
    nullable: true,
  })
  dataExclusao?: Date;
}
