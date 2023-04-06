import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository"
import { GetOrgProfileUseCase } from "../get-org-profile"

export function makeGetOrganizationProfileUseCase() {
  const orgsRepository = new PrismaOrganizationsRepository()
  const useCase = new GetOrgProfileUseCase(orgsRepository)

  return useCase
}