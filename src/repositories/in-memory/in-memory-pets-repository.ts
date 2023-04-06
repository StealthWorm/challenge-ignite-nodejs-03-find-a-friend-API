import { Pet, Prisma } from '@prisma/client'
import { IPetsRepository } from '../I-pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      city: data.city,
      age: data.age ?? null,
      size: data.size ?? null,
      type: data.type ?? null,
      photo: data.photo,
      org_id: data.org_id,
      created_at: new Date()
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find(item => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchManyByCity(city: string, age: string, size: string, type: string, page: number): Promise<Pet[]> {

    let itemsFiltered = this.items.filter(item => item.city.includes(city))

    if (age) {
      itemsFiltered = itemsFiltered.filter(item => item.age === age)
    }
    if (size) {
      itemsFiltered = itemsFiltered.filter(item => item.size === size)
    }
    if (type) {
      itemsFiltered = itemsFiltered.filter(item => item.type === type)
    }

    const itemsFilteredByPage = itemsFiltered.slice((page - 1) * 20, page * 20)

    return itemsFilteredByPage
  }
}
