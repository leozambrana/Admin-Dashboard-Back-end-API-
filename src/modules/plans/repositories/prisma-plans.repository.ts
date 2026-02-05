import { PrismaClient, Plan } from "@prisma/client";
import { IPlansRepository } from "./plans.repository";

export class PrismaPlansRepository implements IPlansRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Plan[]> {
    return this.prisma.plan.findMany({ orderBy: { price: "asc" } });
  }

  async findById(id: string): Promise<Plan | null> {
    return this.prisma.plan.findUnique({ where: { id } });
  }
}
