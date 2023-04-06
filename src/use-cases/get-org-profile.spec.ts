import { hash } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach } from 'vitest'
import { GetOrgProfileUseCase } from './get-org-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get organization profile', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'Jhon Doe',
      email: 'JhonDoe@gmail.com',
      password_hash: await hash('123456', 6),
      address: 'address',
      cep: '00000000',
      whatsappNumber: '11111111',
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('Jhon Doe')
  })

  it('should not be able to get organization profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'random-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})