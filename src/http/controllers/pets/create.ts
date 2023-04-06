import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    city: z.string(),
    age: z.string().nullable(),
    size: z.enum(['small', 'medium', 'big']).nullable(),
    type: z.enum(['all', 'dog', 'cat', 'bird']).nullable(),
    photo: z.string(),
  })

  const { name, description, city, age, size, type, photo } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    description,
    city,
    age,
    size,
    type,
    photo,
    orgId: request.user.sub
  })

  return reply.status(201).send()
}
