import type { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

export const auth = fastifyPlugin((app: FastifyInstance) => {
  app.addHook('preHandler', (request, reply) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>();

        return sub;
      } catch {
        return reply.status(403).send({
          message: 'Unauthorized',
        });
      }
    };
  });
});
