import fastify from 'fastify';
import cors from '@fastify/cors';
import { bootstrap } from 'fastify-decorators';
import { env } from './config/env.js';
import {
  destruirConexaoComFonteDeDados,
  inicializarConexaoComFonteDeDados,
} from './database/data-source.js';
import { errorHandler } from './errors/error.handler.js';
import { SetorController } from './modules/setor/setor.controller.js';
import { EnderecoController } from './modules/endereco/endereco.controller.js';
import { PerfilController } from './modules/perfil/perfil.controller.js';
import { swagger } from './config/swagger.js';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { PermissaoController } from './modules/permissao/permissao.controller.js';
import { UsuarioController } from './modules/usuario/usuario.controller.js';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await swagger(app);

await app.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
});

await inicializarConexaoComFonteDeDados();

app.register(bootstrap, {
  controllers: [
    SetorController,
    EnderecoController,
    PerfilController,
    PermissaoController,
    UsuarioController,
  ],
});

app.setErrorHandler(errorHandler);

app.addHook('onClose', async () => destruirConexaoComFonteDeDados());

await app.listen({ port: env.PORTA });
