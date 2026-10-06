import { randomUUID } from 'crypto'
import type { FastifyInstance } from 'fastify'
import z from 'zod'

interface Users {
  id: string
  name: string
  email: string
}

const users: Users[] = []

export async function routes(app: FastifyInstance) {
  app.get(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'List users',
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
            }),
          ),
        },
      },
    },
    () => {
      return users
    },
  )

  app.post(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'Create a new user',
        response: {
          201: z.null().describe('User created'),
        },
      },
    },
    async (request, reply) => {
      const bodySchema = z.object({
        name: z.string(),
        email: z.string(),
      })

      const { name, email } = bodySchema.parse(request.body)

      users.push({
        id: randomUUID(),
        name,
        email,
      })
      return reply.status(201).send()
    },
  )

  app.delete(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        description: 'Delete a user by ID',
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.null(),
          404: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const paramSchema = z.object({
        id: z.string(),
      })

      const { id } = paramSchema.parse(request.params)

      const userIndex = users.findIndex((user) => user.id === id)

      if (userIndex === -1) {
        return reply.status(404).send({ error: 'User not found' })
      }

      users.splice(userIndex, 1)
      return reply.status(204).send()
    },
  )

  app.patch(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        description: 'Update a user name by ID',
        params: z.object({ id: z.string() }),
        body: z.object({
          name: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
          }),
          404: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const paramsSchema = z.object({
        id: z.string(),
      })
      const bodySchema = z.object({
        name: z.string(),
      })

      const { id } = paramsSchema.parse(request.params)
      const { name } = bodySchema.parse(request.body)

      const user = users.find((user) => user.id === id)

      if (!user) {
        return reply.status(404).send({ error: 'User not found' })
      }

      user.name = name
      return reply.status(200).send(user)
    },
  )
}
