import type { Repository } from 'typeorm';
import type { PerfilEntity } from './perfil.entity.js';
import { PerfilMapper } from '../domain/perfil.mapper.js';
import type { Perfil } from '../domain/perfil.domain.js';

export interface IPerfilRepository {
  consultarPorId(id: number): Promise<Perfil | null>;
}

export class PerfilRepository implements IPerfilRepository {
  constructor(private readonly repository: Repository<PerfilEntity>) {}

  async consultarPorId(id: number): Promise<Perfil | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? PerfilMapper.deEntityParaDomain(entity) : null;
  }
}
