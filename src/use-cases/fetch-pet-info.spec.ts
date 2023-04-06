import { hash } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach } from 'vitest'
import { FetchPetInfoUseCase } from './fetch-pet-info'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetInfoUseCase

describe('Get Pet Information Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetInfoUseCase(petsRepository)
  })

  it('should be able to get pet infos', async () => {
    const createdPet = await petsRepository.create({
      name:'Scooby Dooby Doo',
      description: null,
      city: 'San Francisco',
      age: '4',
      size: null,
      type: null,
      photo: 'akjshdkjashdjkhasd',
      org_id: '1'
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Scooby Dooby Doo')
  })

  it('should not be able to get pet with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'random-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})