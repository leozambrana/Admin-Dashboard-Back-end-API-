import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaProjectsRepository } from "../repositories/prisma-projects.repository";
import { AppError } from "../../../shared/errors/app-error";

export const updateProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status, progress } = req.body;

    const projectsRepository = new PrismaProjectsRepository(prisma);
    const project = await projectsRepository.findById(id);

    if (!project) {
      throw new AppError("Projeto não encontrado", 404);
    }

    const updatedProject = await projectsRepository.update(id, { status, progress });

    return res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};
