import { NextFunction, Request, Response } from "express";
import { GenerateAvatarPresignUseCase } from "../use-cases/generate-avatar-presign.use-case";
import { LocalStorageProvider } from "../../../shared/providers/StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "../../../shared/providers/StorageProvider/implementations/S3StorageProvider";
import uploadConfig from "../../../config/upload";

export const generateAvatarPresignController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storageProvider = uploadConfig.driver === "s3" 
      ? new S3StorageProvider() 
      : new LocalStorageProvider();

    const generatePresign = new GenerateAvatarPresignUseCase(storageProvider);

    const id = req.params.id as string;
    const { contentType } = req.body;

    const credentials = await generatePresign.execute({
      userId: id,
      contentType: contentType || "image/jpeg",
    });

    return res.json(credentials);
  } catch (error) {
    next(error);
  }
};
