import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { FetchPetInfoUseCase } from "../fetch-pet-info"

export function makeFetchPetInfoUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetInfoUseCase(petsRepository)

  return useCase
}