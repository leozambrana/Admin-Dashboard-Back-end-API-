import { Project, ProjectStatus } from "@prisma/client";

export interface IProjectsRepository {
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  update(id: string, data: any): Promise<Project>;
  countByStatus(status: ProjectStatus): Promise<number>;
}
