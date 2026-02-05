import { DataSource } from 'typeorm';
import { env } from '../config/env.js';
import logger from '../logger/index.js';
import { SetorEntity } from '../modules/setor/infra/setor.entity.js';

export const fonteDeDados = new DataSource({
  type: 'postgres',
  host: env.ENDERECO_BD,
  port: env.PORTA_BD,
  username: env.USUARIO_BD,
  password: env.SENHA_BD,
  database: env.NOME_BD,
  synchronize: false,
  logging: true, // ✅ Ativar logging para debug
  entities: [SetorEntity],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
  ssl: { rejectUnauthorized: false },
  connectTimeoutMS: 10000, // ✅ Timeout de 10 segundos
  extra: {
    connectionTimeoutMillis: 10000,
  },
});

export async function inicializarConexaoComFonteDeDados() {
  try {
    logger.info('Iniciando fonte de dados...');
    await fonteDeDados.initialize();

    logger.info(`Aplicação rodando na porta ${env.PORTA}!`);
  } catch (err) {
    logger.error('Ocorreu um erro ao inicializar a fonte de dados');
    throw err;
  }
}

export async function destruirConexaoComFonteDeDados() {
  try {
    await fonteDeDados.destroy();
    logger.info('Conexão com Fonte de Dados encerrada!');
  } catch (err) {
    logger.error('Ocorreu um erro ao encerrar a conexão fonte de dados');
    throw err;
  }
}
