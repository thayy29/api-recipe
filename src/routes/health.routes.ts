import type { FastifyInstance } from 'fastify'
import z from 'zod'

export async function healthRoutes(app: FastifyInstance) {
  return app.get(
    '/health',
    {
      schema: {
        tags: ['health'],
        description: 'Health check',
        response: {
          200: z.object({
            hello: z.string(),
          }),
        },
      },
    },
    () => {
      return { hello: 'world' }
    },
  )
}
