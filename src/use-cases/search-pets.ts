import { IPetsRepository } from '@/repositories/I-pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetUseCaseRequest {
  city: string,
  age: string | null, 
  size: string | null,
  type: string | null,
  page: number,
}

interface SearchPetUseCaseResponse {
  pets: Pet[]
}

export class SearchPetUseCase {
  constructor(private petsRepository: IPetsRepository) { }

  async execute({ city, age, size, type, page }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {

    const pets = await this.petsRepository.searchManyByCity(city, age, size, type, page)

    return { pets, }
  }
}
