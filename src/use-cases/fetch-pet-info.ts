import { Organization, Pet } from '@prisma/client'

import { IPetsRepository } from '@/repositories/I-pets-repository'
import { IOrganizationsRepository } from '@/repositories/I-organizations-repository';

import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface FetchPetInfoUseCaseRequest {
  petId: string;
}

interface FetchPetInfoUseCaseResponse {
  pet: Pet;
}

export class FetchPetInfoUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrganizationsRepository,
  ) { }

  async execute({ petId }: FetchPetInfoUseCaseRequest): Promise<FetchPetInfoUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
