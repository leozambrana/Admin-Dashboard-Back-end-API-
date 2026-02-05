import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaUserRepository } from "../../users/repositories/prisma-user.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppError } from "../../../shared/errors/app-error";
import { UserMapper } from "../../users/mappers/user.mapper";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const userRepository = new PrismaUserRepository(prisma);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any }
    );

    return res.json({
      user: UserMapper.toResponseDto(user),
      token,
    });
  } catch (error) {
    next(error);
  }
};

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
