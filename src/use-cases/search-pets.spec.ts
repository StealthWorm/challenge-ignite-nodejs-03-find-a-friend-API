import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetUseCase(petsRepository)
  })

  it('should be able to search for pets at a specific city', async () => {
    await petsRepository.create({
      name: 'Juca',
      description: null,
      city: 'Ponta Grossa',
      age: null,
      size: null,
      type: null,
      photo: 'photo',
      org_id: 'org-1'
    })

    await petsRepository.create({
      name: 'Pedrinho',
      description: null,
      city: 'Ponta Grossa',
      age: null,
      size: null,
      type: null,
      photo: 'photo',
      org_id: 'org-2'
    })

    const { pets } = await sut.execute({
      city: 'Ponta Grossa',
      age: null,
      size: '',
      type: '',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Juca' }))
  })

  it('should be able to search for pets at a specific city with additional filters', async () => {
    await petsRepository.create({
      name: 'Juca',
      description: null,
      city: 'Ponta Grossa',
      age: '4',
      size: 'small',
      type: 'dog',
      photo: 'photo',
      org_id: 'org-1'
    })

    await petsRepository.create({
      name: 'Pedrinho',
      description: null,
      city: 'Ponta Grossa',
      age: '3',
      size: 'medium',
      type: 'dog',
      photo: 'photo',
      org_id: 'org-2'
    })

    await petsRepository.create({
      name: 'lulu',
      description: null,
      city: 'Ponta Grossa',
      age: '3',
      size: 'medium',
      type: 'cat',
      photo: 'photo',
      org_id: 'org-1'
    })

    const { pets } = await sut.execute({
      city: 'Ponta Grossa',
      age: null,
      size: '',
      type: 'cat',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'lulu' }))
  })

  it('should be able to fetch paginated pets search', async () => {

    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Javascript Dog ${i}`,
        description: null,
        city: 'Ponta Grossa',
        age: null,
        size: null,
        type: null,
        photo: 'photo',
        org_id: 'org-1'
      })
    }

    const { pets } = await sut.execute({
      city: 'Ponta Grossa',
      age: '',
      size: '',
      type: '',
      page: 2
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Javascript Dog 21' }),
      expect.objectContaining({ name: 'Javascript Dog 22' }),
    ])
  })
})