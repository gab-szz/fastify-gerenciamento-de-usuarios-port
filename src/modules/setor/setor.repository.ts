import type { SetorEntity } from './setor.entity.js';
import type { Setor } from './setor.domain.js';
import type { Repository } from 'typeorm';
import { SetorMapper } from './setor.mapper.js';

export interface ISetorRepository {
  inserir(setor: Setor): Promise<SetorEntity>;
  consultarPorId(id: number): Promise<Setor | null>;
}

export class SetorRepository implements ISetorRepository {
  repository: Repository<SetorEntity>;

  constructor(repository: Repository<SetorEntity>) {
    this.repository = repository;
  }

  async inserir(setor: Setor): Promise<Setor> {
    const dados = SetorMapper.domainParaEntity(setor);
    return SetorMapper.entityParaDomain(
      await this.repository.save(dados),
    );
  }

  async consultarPorId(id: number): Promise<Setor | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? SetorMapper.entityParaDomain(entity) : null;
  }
}
