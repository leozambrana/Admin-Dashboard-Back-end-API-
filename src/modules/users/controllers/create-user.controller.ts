import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaUserRepository } from "../repositories/prisma-user.repository";
import { CreateUserUseCase } from "../use-cases/create-user.use-case";
import { CreateUserValidator } from "../validators/create-user.validator";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validator = new CreateUserValidator(req);
    const data = validator.getData();

    const userRepository = new PrismaUserRepository(prisma);
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const result = await createUserUseCase.execute(data);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
