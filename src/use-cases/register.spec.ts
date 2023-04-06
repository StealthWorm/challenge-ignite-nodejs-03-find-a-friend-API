import { compare } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { beforeEach } from 'vitest'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register a new Organization', async () => {
    const { org } = await sut.execute({
      name: 'Jhon Doe',
      email: 'JhonDoe@gmail.com',
      password: '123456',
      address: 'address',
      cep: '00000000',
      whatsappNumber: '11111111',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Jhon Doe',
      email: 'JhonDoe@gmail.com',
      password: '123456',
      address: 'address',
      cep: '00000000',
      whatsappNumber: '11111111',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'JhonDoe@gmail.com'

    await sut.execute({
      name: 'Jhon Doe',
      email,
      password: '123456',
      address: 'address',
      cep: '00000000',
      whatsappNumber: '11111111',
    })

    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        email,
        password: '123456',
        address: 'address',
        cep: '00000000',
        whatsappNumber: '11111111',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})