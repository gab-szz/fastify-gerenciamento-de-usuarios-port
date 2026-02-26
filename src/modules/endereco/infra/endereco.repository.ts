import type { Repository } from 'typeorm';
import type { Endereco } from '../domain/endereco.domain.js';
import { EnderecoMapper } from '../domain/endereco.mapper.js';

export interface IEnderecoRepository {
  inserir(endereco: Endereco): Promise<Endereco>;
  consultarPorId(id: number): Promise<Endereco | null>;
  consultarPorNome(nome: string): Promise<Endereco | null>;
  consultarTodos(): Promise<Endereco[]>;
  atualizar(endereco: Endereco): Promise<Endereco | null>;
  remover(endereco: Endereco): Promise<boolean>;
}

export class EnderecoRepository {
  repository: Repository<Endereco>;

  constructor(repository: Repository<Endereco>) {
    this.repository = repository;
  }

  async inserir(endereco: Endereco): Promise<Endereco> {
    const dados = EnderecoMapper.domainParaEntity(endereco);
    return EnderecoMapper.entityParaDomain(
      await this.repository.save(dados as Endereco),
    );
  }

  async consultarTodos(): Promise<Endereco[]> {
    const entities = await this.repository.find();
    let enderecos: Endereco[] = [];
    if (entities) {
      entities.forEach((endereco) =>
        enderecos.push(EnderecoMapper.entityParaDomain(endereco)),
      );
    }
    return enderecos;
  }

  async consultarPorId(id: number): Promise<Endereco | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? EnderecoMapper.entityParaDomain(entity) : null;
  }

  async atualizar(endereco: Endereco): Promise<Endereco | null> {
    const entitySalva = await this.repository.save(
      EnderecoMapper.domainParaEntity(endereco),
    );
    return entitySalva ? EnderecoMapper.entityParaDomain(entitySalva) : null;
  }

  async remover(endereco: Endereco): Promise<boolean> {
    const resultado = await this.repository.delete(endereco.id!);
    return resultado.affected ? true : false;
  }
}
