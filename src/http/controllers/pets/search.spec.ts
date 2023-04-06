import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city or additional filters', async () => {
    const { token } = await createAndAuthenticateOrganization(app, true)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Javascript Dog',
        description: null,
        city: 'Ponta Grossa',
        age: null,
        size: null,
        type: "cat",
        photo: 'photo',
        org_id: 'org-1'
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Javascript Dog',
        description: null,
        city: 'Ponta Grossa',
        age: null,
        size: null,
        type: "dog",
        photo: 'photo',
        org_id: 'org-1'
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Javascript Cat',
        description: null,
        city: 'Ponta Grossa',
        age: '4',
        size: 'small',
        type: 'cat',
        photo: 'photo',
        org_id: 'org-1'
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Javascript Dog',
        description: null,
        city: 'Curitiba',
        age: null,
        size: null,
        type: "bird",
        photo: 'photo',
        org_id: 'org-2'
      })

    let response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Ponta Grossa',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(3)

    response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Curitiba',
        type: 'bird',
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
  })
})