import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaUserRepository } from "../repositories/prisma-user.repository";
import { GetUserUseCase } from "../use-cases/get-user.use-case";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const userRepository = new PrismaUserRepository(prisma);
    const getUserUseCase = new GetUserUseCase(userRepository);

    const result = await getUserUseCase.execute(id);

    return res.json(result);
  } catch (error) {
    next(error);
  }
};
