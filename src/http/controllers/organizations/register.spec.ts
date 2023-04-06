import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/orgs')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        address: 'address',
        cep: '00000000',
        whatsappNumber: '11111111',
      })

    expect(response.statusCode).toEqual(201)
  })
})