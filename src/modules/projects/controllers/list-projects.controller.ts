import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaProjectsRepository } from "../repositories/prisma-projects.repository";

export const listProjectsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectsRepository = new PrismaProjectsRepository(prisma);
    const projects = await projectsRepository.findAll();
    return res.json(projects);
  } catch (error) {
    next(error);
  }
};
