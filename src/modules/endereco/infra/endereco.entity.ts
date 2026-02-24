import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('endereco')
export class EnderecoEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({
    name: 'rua',
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  rua!: string;

  @Column({
    name: 'cidade',
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  cidade!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  estado!: string;

  @Column({
    name: 'cep',
    type: 'varchar',
    length: 14,
    nullable: false,
  })
  cep!: string;

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
