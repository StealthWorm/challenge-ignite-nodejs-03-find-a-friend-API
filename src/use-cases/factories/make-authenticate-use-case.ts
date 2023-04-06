import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrganizationsRepository()
  const authenticateUseCase = new AuthenticateUseCase(orgsRepository)

  return authenticateUseCase
}