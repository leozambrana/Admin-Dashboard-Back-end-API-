import { IUserRepository } from "../repositories/user.repository";
import { IStorageProvider } from "../../../shared/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "../../../shared/errors/app-error";

interface IRequest {
  userId: string;
  avatarFilename: string;
  isDirectUpload?: boolean;
}

export class UpdateUserAvatarUseCase {
  constructor(
    private userRepository: IUserRepository,
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ userId, avatarFilename, isDirectUpload }: IRequest) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("Somente usuários autenticados podem alterar o avatar.", 401);
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    let finalFileName = avatarFilename;

    if (!isDirectUpload) {
      finalFileName = await this.storageProvider.save(avatarFilename, "avatar");
    }

    const updatedUser = await this.userRepository.update(userId, {
      avatar: finalFileName,
    });

    return updatedUser;
  }
}
