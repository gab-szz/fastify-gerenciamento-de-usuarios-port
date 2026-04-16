import { Service } from 'fastify-decorators';
import { SetorMapper } from '../domain/setor.mapper.js';
import type { Setor } from '../domain/setor.domain.js';
import type { ISetorRepository } from './setor.repository.interface.js';
import { fonteDeDados } from '../../../database/data-source.js';
import { SetorEntity } from './setor.entity.js';

@Service()
export class SetorRepository implements ISetorRepository {
  private get repository() {
    return fonteDeDados.getRepository(SetorEntity);
  }

  async inserir(setor: Setor): Promise<Setor> {
    const dados = SetorMapper.domainParaEntity(setor);
    return SetorMapper.entityParaDomain(await this.repository.save(dados));
  }

  async consultarTodos(): Promise<Setor[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => SetorMapper.entityParaDomain(entity));
  }

  async consultarPorId(id: number): Promise<Setor | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? SetorMapper.entityParaDomain(entity) : null;
  }

  async consultarPorNome(nome: string): Promise<Setor | null> {
    const entity = await this.repository.findOneBy({ nome });
    return entity ? SetorMapper.entityParaDomain(entity) : null;
  }

  async atualizar(setor: Setor): Promise<Setor | null> {
    const entityParaSalvar = SetorMapper.domainParaEntity(setor);
    const entitySalva = await this.repository.save(entityParaSalvar);
    return entitySalva ? SetorMapper.entityParaDomain(entitySalva) : null;
  }

  async remover(setor: Setor): Promise<boolean> {
    const resultado = await this.repository.delete(setor.id!);
    return resultado.affected ? true : false;
  }
}
