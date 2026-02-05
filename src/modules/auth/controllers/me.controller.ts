import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaUserRepository } from "../../users/repositories/prisma-user.repository";
import { AppError } from "../../../shared/errors/app-error";
import { UserMapper } from "../../users/mappers/user.mapper";

export const meController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new AppError("Não autenticado", 401);
    }

    const userRepository = new PrismaUserRepository(prisma);
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return res.json({ user: UserMapper.toResponseDto(user) });
  } catch (error) {
    next(error);
  }
};
