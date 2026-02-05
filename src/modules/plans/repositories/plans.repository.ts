import { Plan } from "@prisma/client";

export interface IPlansRepository {
  findAll(): Promise<Plan[]>;
  findById(id: string): Promise<Plan | null>;
}
