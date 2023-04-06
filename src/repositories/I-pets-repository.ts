import { Pet, Prisma } from '@prisma/client'

export interface IPetsRepository {
  findById(id: string): Promise<Pet | null>
  searchManyByCity(city: string, age: string | null, size: string | null, type: string | null, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}