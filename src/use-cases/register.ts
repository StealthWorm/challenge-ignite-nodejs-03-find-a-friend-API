import { IOrganizationsRepository } from '@/repositories/I-organizations-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Organization } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  address: string | null
  cep: string | null
  whatsappNumber: string
  password: string
}

interface RegisterUseCaseResponse {
  org: Organization
}

export class RegisterUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) { }

  async execute({ name, email, address, cep, whatsappNumber, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.organizationsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.organizationsRepository.create({
      name,
      email,
      address,
      cep,
      whatsappNumber,
      password_hash,
    })

    return { org, }
  }
}
