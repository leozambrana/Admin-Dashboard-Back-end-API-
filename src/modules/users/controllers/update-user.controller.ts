import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaUserRepository } from "../repositories/prisma-user.repository";
import { UpdateUserUseCase } from "../use-cases/update-user.use-case";
import { UpdateUserValidator } from "../validators/update-user.validator";

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const validator = new UpdateUserValidator(req);
    const data = validator.getData();

    const userRepository = new PrismaUserRepository(prisma);
    const updateUserUseCase = new UpdateUserUseCase(userRepository);

    const result = await updateUserUseCase.execute(id, data);

    return res.json(result);
  } catch (error) {
    next(error);
  }
};
