import { hash } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { beforeEach } from 'vitest'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Jhon Doe',
      email: 'JhonDoe@gmail.com',
      address: 'address',
      cep: '00000000',
      whatsappNumber: '11111111',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'JhonDoe@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'JhonDoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'Jhon Doe',
      email: 'JhonDoe@gmail.com',
      address: 'address',
      cep: '00000000',
      whatsappNumber: '11111111',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'JhonDoe@gmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})