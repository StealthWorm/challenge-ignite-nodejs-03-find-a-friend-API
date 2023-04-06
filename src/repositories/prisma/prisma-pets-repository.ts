import { prisma } from "@/lib/prisma";
import { Pet, Prisma } from "@prisma/client";
import { IPetsRepository } from "../I-pets-repository";

export class PrismaPetsRepository implements IPetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        org: true,
      }
    })

    return pet
  }

  async searchManyByCity(city: string, age: string, size: string, type: string, page: number): Promise<Pet[]> {
    const filters: any = {
      city: {
        contains: city,
      },
    };

    if (age !== '') {
      filters.age = age;
    }

    if (size !== "all") {
      filters.size = size;
    }

    if (type !== "all") {
      filters.type = type;
    }

    const pets = await prisma.pet.findMany({
      where: filters,
      take: 20,
      skip: (page - 1) * 20,
    });

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

}