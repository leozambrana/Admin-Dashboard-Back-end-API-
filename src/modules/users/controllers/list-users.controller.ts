import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaUserRepository } from "../repositories/prisma-user.repository";
import { ListUsersUseCase } from "../use-cases/list-users.use-case";
import { UserFilters } from "../entities/user-filters.vo";
import { Status } from "@prisma/client";

export const listUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = new UserFilters({
      search: req.query.search as string,
      status: req.query.status as Status | "all",
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    });

    const userRepository = new PrismaUserRepository(prisma);
    const listUsersUseCase = new ListUsersUseCase(userRepository);

    const result = await listUsersUseCase.execute(filters);

    return res.json(result);
  } catch (error) {
    next(error);
  }
};
