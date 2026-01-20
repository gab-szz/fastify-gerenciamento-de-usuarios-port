import type { SetorEntity } from './setor.entity.js';
import type { Setor } from './setor.domain.js';
import type { Repository } from 'typeorm';
import { SetorMapper } from './setor.mapper.js';

export interface ISetorRepository {
  inserir(setor: Setor): Promise<SetorEntity>;
}

export class SetorRepository implements ISetorRepository {
  repository: Repository<SetorEntity>;

  constructor(repository: Repository<SetorEntity>) {
    this.repository = repository;
  }

  async inserir(setor: Setor): Promise<SetorEntity> {
    const dados = SetorMapper.domainParaEntity(setor);
    return this.repository.save(dados);
  }
}
