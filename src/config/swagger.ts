import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export async function swagger(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    openapi: {
      info: { title: 'Fastify-Gerenciamento-de-Usuários', version: '1.0.0' },
      components: {
        securitySchemes: {
          token: {
            type: 'apiKey',
            in: 'header',
            name: 'x-app-token',
          },
          password: {
            type: 'apiKey',
            in: 'header',
            name: 'x-app-password',
          },
        },
      },
      security: [{ token: [], password: [] }],
    },
    transform: jsonSchemaTransform,
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'list', deepLinking: false },
  });
}
