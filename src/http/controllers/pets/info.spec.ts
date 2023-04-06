import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Pet Info (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet infos', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const org = await prisma.organization.findFirstOrThrow()

    let petId = '1'

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Josefino',
        description: 'Cachorro bonito',
        city: 'Ponta Grossa',
        age: '4',
        size: 'small',
        type: 'dog',
        photo: 'photo',
      })

    const pet = await prisma.pet.findFirstOrThrow()

    const response = await request(app.server)
      .get(`/pets/show/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        org_id: org.id
      })
    )
  })
})