import z from 'zod';
import { Controller } from 'fastify-decorators';

const idSchema = z.object({ id: z.coerce.number().min(1) });

@Controller({ route: '/permissao' })
export class PermissaoController {}
