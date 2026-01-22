import type { SetorEntity } from './setor.entity.js';
import type { Setor } from './setor.domain.js';
import type { Repository } from 'typeorm';
import { SetorMapper } from './setor.mapper.js';

export interface ISetorRepository {
  inserir(setor: Setor): Promise<SetorEntity>;
  consultarPorId(id: number): Promise<Setor | null>;
  consultarPeloNome(nome: string): Promise<Setor | null>;
  atualizar(setor: Setor): Promise<Setor | null>;
  remover(setor: Setor): Promise<boolean>;
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

  async consultarPeloNome(nome: string): Promise<Setor | null> {
    const entity = await this.repository.findOneBy({ nome });
    return entity ? SetorMapper.entityParaDomain(entity) : null;
  }

  async atualizar(setor: Setor): Promise<Setor | null> {
    this.validarIdExistente(setor);

    const entityParaSalvar = SetorMapper.domainParaEntity(setor);
    const entitySalva = await this.repository.save(entityParaSalvar);
    return entitySalva
      ? SetorMapper.entityParaDomain(entitySalva)
      : null;
  }

  async remover(setor: Setor): Promise<boolean> {
    this.validarIdExistente(setor);

    const result = await this.repository.delete(setor.id!);
    return result.affected ? true : false;
  }

  private async validarIdExistente(setor: Setor): Promise<void> {
    if (!setor.id) {
      throw new Error(
        'Não foi informado nenhum ID para esta operação no Banco de Dados.',
      );
    }
    if (!this.consultarPorId(setor.id)) {
      throw new Error(
        'Não encontramos nenhum setor com o ID informado para esta operação no Banco de Dados.',
      );
    }
  }
}
