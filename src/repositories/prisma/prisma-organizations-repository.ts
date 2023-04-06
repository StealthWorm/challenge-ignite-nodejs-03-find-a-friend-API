import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IOrganizationsRepository } from '../I-organizations-repository'

export class PrismaOrganizationsRepository implements IOrganizationsRepository {
  async findById(id: string) {
    const org = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const org = await prisma.organization.create({
      data,
    })

    return org
  }
}
