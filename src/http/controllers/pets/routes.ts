import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { search } from './search'
import { create } from './create'
import { info } from './info'
import { verifyOrgRole } from '@/http/middlewares/verify-org-role'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/pets', search)
  app.get('/pets/show/:pet_id', info)

  app.post('/pets',  create) //{ onRequest: [verifyOrgRole('ADMIN')] },
}
