import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { SearchPetUseCase } from "../search-pets"

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetUseCase(petsRepository)

  return useCase
}