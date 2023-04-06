import { makeGetOrganizationProfileUseCase } from '@/use-cases/factories/make-get-organization-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrganizationProfile = makeGetOrganizationProfileUseCase()

  const { org } = await getOrganizationProfile.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...org,
      password_hash: undefined,
    }
  })
}
