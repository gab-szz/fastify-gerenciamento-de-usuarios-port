import { Service } from 'fastify-decorators';
import { EnderecoMapper } from '../domain/endereco.mapper.js';
import type { Endereco } from '../domain/endereco.domain.js';
import type { IEnderecoRepository } from './endereco.repository.interface.js';
import { fonteDeDados } from '../../../database/data-source.js';
import { EnderecoEntity } from './endereco.entity.js';

@Service()
export class EnderecoRepository implements IEnderecoRepository {
  private get repository() {
    return fonteDeDados.getRepository(EnderecoEntity);
  }

  /**
   * Cria um novo setor no Banco de Dados
   * @Param endereco - Objeto do tipo Endereco a ser convertido a entidade e inserido no banco de dados
   * @Returns Objeto do tipo Endereco criado
   */
  async inserir(endereco: Endereco): Promise<Endereco> {
    const dados = EnderecoMapper.domainParaEntity(endereco);
    return EnderecoMapper.entityParaDomain(
      await this.repository.save(dados as Endereco),
    );
  }

  /**
   * Consulta todos os endereços no Banco de Dados
   * @Returns Array de objetos do tipo Endereco com todos os endereços cadastrados
   */
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

  /**
   * Consulta um endereço específico pelo ID no Banco de Dados
   * @Param id - Identificador único do endereço
   * @Returns Objeto do tipo Endereco ou null se não encontrado
   */
  async consultarPorId(id: number): Promise<Endereco | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? EnderecoMapper.entityParaDomain(entity) : null;
  }

  /**
   * Atualiza um endereço existente no Banco de Dados
   * @Param endereco - Objeto do tipo Endereco a ser atualizado
   * @Returns Objeto do tipo Endereco atualizado ou null se não encontrado
   */
  async atualizar(endereco: Endereco): Promise<Endereco | null> {
    const entitySalva = await this.repository.save(
      EnderecoMapper.domainParaEntity(endereco),
    );
    return entitySalva ? EnderecoMapper.entityParaDomain(entitySalva) : null;
  }

  /**
   * Remove um endereço do Banco de Dados
   * @Param endereco - Objeto do tipo Endereco a ser removido
   * @Returns Boolean indicando se a remoção foi bem-sucedida
   */
  async remover(endereco: Endereco): Promise<boolean> {
    const resultado = await this.repository.delete(endereco.id!);
    return resultado.affected ? true : false;
  }
}
