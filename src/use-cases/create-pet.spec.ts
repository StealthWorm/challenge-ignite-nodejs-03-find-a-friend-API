import { describe, it, expect } from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
      name:'Scooby Dooby Doo',
      description: null,
      city: 'San Francisco',
      age: '4',
      size: null,
      type: null,
      photo: 'akjshdkjashdjkhasd',
      orgId: '1'
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})