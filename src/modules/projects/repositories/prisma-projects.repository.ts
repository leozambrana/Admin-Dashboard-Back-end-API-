import { PrismaClient, Project, ProjectStatus } from "@prisma/client";
import { IProjectsRepository } from "./projects.repository";

export class PrismaProjectsRepository implements IProjectsRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<Project> {
    return this.prisma.project.update({ where: { id }, data });
  }

  async countByStatus(status: ProjectStatus): Promise<number> {
    return this.prisma.project.count({ where: { status } });
  }
}
