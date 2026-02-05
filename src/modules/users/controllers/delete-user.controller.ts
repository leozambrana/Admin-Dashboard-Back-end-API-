import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaUserRepository } from "../repositories/prisma-user.repository";
import { DeleteUserUseCase } from "../use-cases/delete-user.use-case";

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const userRepository = new PrismaUserRepository(prisma);
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    await deleteUserUseCase.execute(id);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
