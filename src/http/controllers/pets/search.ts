import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  // const searchPetsParamsSchema = z.object({
  //   city: z.string(),
  // })

  const searchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().nullable().default(''),
    size: z.enum(['all', 'small', 'medium', 'big']).default('all'),
    type: z.enum(['all', 'dog', 'cat', 'bird']).default('all'),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, age, size, type, page } = searchPetsQuerySchema.parse(request.query)
  // const { city } = searchPetsParamsSchema.parse(request.params)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    age,
    size,
    type,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}
