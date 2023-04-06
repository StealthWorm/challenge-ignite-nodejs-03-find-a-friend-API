import { IPetsRepository } from '@/repositories/I-pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string,
  city: string,
  description: string | null,
  age: string | null,
  size: string | null,
  type: string | null,
  photo: string,
  orgId: string,
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: IPetsRepository) { }

  async execute({ name, description, city, age, size, type, photo, orgId }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {

    const pet = await this.petsRepository.create({
      name,
      description,
      city,
      age,
      size,
      type,
      photo,
      org_id: orgId
    })

    return { pet, }
  }
}
