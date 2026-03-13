import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaUserRepository } from "../repositories/prisma-user.repository";
import { UpdateUserAvatarUseCase } from "../use-cases/update-user-avatar.use-case";
import { LocalStorageProvider } from "../../../shared/providers/StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "../../../shared/providers/StorageProvider/implementations/S3StorageProvider";
import uploadConfig from "../../../config/upload";
import { UserMapper } from "../mappers/user.mapper";

export const updateUserAvatarController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = new PrismaUserRepository(prisma);
    
    // Instancia o provider correto baseado na configuração do seu .env
    const storageProvider = uploadConfig.driver === "s3" 
      ? new S3StorageProvider() 
      : new LocalStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarUseCase(
      userRepository,
      storageProvider
    );

    const id = req.params.id as string;

    const avatarFilename = req.file?.filename || req.body.avatarFilename;

    if (!avatarFilename) {
      throw new Error("Arquivo não enviado ou nome do arquivo não informado");
    }

    const isDirectUpload = !req.file && !!req.body.avatarFilename;

    const user = await updateUserAvatar.execute({
      userId: id,
      avatarFilename,
      isDirectUpload
    });

    return res.json(UserMapper.toResponseDto(user));
  } catch (error) {
    next(error);
  }
};
