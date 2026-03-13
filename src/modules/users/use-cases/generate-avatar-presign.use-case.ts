import { IStorageProvider } from "../../../shared/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "../../../shared/errors/app-error";
import crypto from "crypto";

interface IRequest {
  userId: string;
  contentType: string;
}

export class GenerateAvatarPresignUseCase {
  constructor(private storageProvider: IStorageProvider) {}

  public async execute({ userId, contentType }: IRequest) {
    if (!userId) {
      throw new AppError("Usuário não autenticado", 401);
    }

    const fileHash = crypto.randomBytes(10).toString("hex");
    const filename = `${fileHash}-avatar`;

    const url = await this.storageProvider.getPresignedUploadUrl(filename, "avatar", contentType);

    return { url, filename };
  }
}
