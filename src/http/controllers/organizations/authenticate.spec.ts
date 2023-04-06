import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      address: null,
      cep: null,
      whatsappNumber: '9129871289',
    })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@example.com',
        password: '123456'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})