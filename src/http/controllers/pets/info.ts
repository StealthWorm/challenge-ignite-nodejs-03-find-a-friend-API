import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchPetInfoUseCase } from '@/use-cases/factories/make-fetch-pet-info-use-case'

export async function info(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetInfoParamsSchema = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id } = fetchPetInfoParamsSchema.parse(request.params)

  const fetchPetInfoUseCase = makeFetchPetInfoUseCase()

  const { pet } = await fetchPetInfoUseCase.execute({ petId: pet_id })

  return reply.status(200).send({
    pet: {
      ...pet,
    }
  })
}
