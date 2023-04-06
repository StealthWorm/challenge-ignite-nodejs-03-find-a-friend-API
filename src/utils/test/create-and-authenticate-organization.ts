import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createAndAuthenticateOrganization(app: FastifyInstance, isAdmin = false) {
  const org = await prisma.organization.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      cep: '84015450',
      whatsappNumber: '429200010002',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    }
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: 'johndoe@example.com',
      password: '123456',
      role: 'admin'
    })

  const { token } = authResponse.body

  return { token, }
}