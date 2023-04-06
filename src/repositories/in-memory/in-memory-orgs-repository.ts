import { Prisma, Organization } from '@prisma/client'
import { IOrganizationsRepository } from '../I-organizations-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements IOrganizationsRepository {
  public items: Organization[] = []

  async findById(id: string) {
    const org = this.items.find(item => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find(item => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address: data.address,
      cep: data.cep,
      whatsappNumber: data.whatsappNumber,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.items.push(org)

    return org
  }
}
