import { PrismaClient, User } from "@prisma/client";
import { IUserRepository, GetUsersArgs } from "./user.repository";

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(args: GetUsersArgs): Promise<User[]> {
    return this.prisma.user.findMany(args);
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: any): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: any): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async count(where?: any): Promise<number> {
    return this.prisma.user.count({ where });
  }
}
