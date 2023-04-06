import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
 
  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app, true)

    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201)
  })
})