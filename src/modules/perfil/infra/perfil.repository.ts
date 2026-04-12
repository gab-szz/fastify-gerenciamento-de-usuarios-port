import type { Repository } from 'typeorm';
import { ILike } from 'typeorm';
import type { PerfilEntity } from './perfil.entity.js';
import { PerfilMapper } from '../domain/perfil.mapper.js';
import type { Perfil } from '../domain/perfil.domain.js';

export interface IPerfilRepository {
  consultarTodos(): Promise<Perfil[]>;
  consultarPorId(id: number): Promise<Perfil | null>;
  consultarPorNome(nome: string): Promise<Perfil | null>;
  inserir(input: Perfil): Promise<Perfil | null>;
  atualizar(input: Perfil): Promise<Perfil | null>;
  remover(perfil: Perfil): Promise<boolean>;
}

export class PerfilRepository implements IPerfilRepository {
  constructor(private readonly repository: Repository<PerfilEntity>) {}

  async consultarPorId(id: number): Promise<Perfil | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? PerfilMapper.entityParaDomain(entity) : null;
  }

  async consultarPorNome(nome: string): Promise<Perfil | null> {
    const entity = await this.repository.findOne({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
    return entity ? PerfilMapper.entityParaDomain(entity) : null;
  }

  async consultarTodos(): Promise<Perfil[]> {
    const perfis = await this.repository.find();
    return perfis
      ? perfis.map((perfil) => PerfilMapper.entityParaDomain(perfil))
      : [];
  }

  async inserir(input: Perfil): Promise<Perfil | null> {
    const entity = PerfilMapper.domainParaEntity(input);
    return PerfilMapper.entityParaDomain(await this.repository.save(entity));
  }

  async atualizar(perfil: Perfil): Promise<Perfil | null> {
    const entityParaSalvar = PerfilMapper.domainParaEntity(perfil);
    const entitySalva = await this.repository.save(entityParaSalvar);
    return entitySalva ? PerfilMapper.entityParaDomain(entitySalva) : null;
  }

  async remover(perfil: Perfil): Promise<boolean> {
    const resultado = await this.repository.delete(perfil.id!);
    return resultado.affected ? true : false;
  }
}
