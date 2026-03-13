import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaUserRepository } from "../repositories/prisma-user.repository";
import { ListUsersUseCase } from "../use-cases/list-users.use-case";
import { UserFilters } from "../entities/user-filters.vo";
import { Status } from "@prisma/client";
import { S3StorageProvider } from "../../../shared/providers/StorageProvider/implementations/S3StorageProvider";
import { LocalStorageProvider } from "../../../shared/providers/StorageProvider/implementations/LocalStorageProvider";
import uploadConfig from "../../../config/upload";

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

    const storageProvider = uploadConfig.driver === "s3" 
      ? new S3StorageProvider() 
      : new LocalStorageProvider();

    const usersWithSignedUrls = await Promise.all(
      result.data.map(async (user) => {
        if (user.avatar && !user.avatar.startsWith("http")) {
          user.avatar = await storageProvider.getSignedUrl(user.avatar, "avatar");
        }
        return user;
      })
    );

    return res.json({
      ...result,
      data: usersWithSignedUrls,
    });
  } catch (error) {
    next(error);
  }
};
