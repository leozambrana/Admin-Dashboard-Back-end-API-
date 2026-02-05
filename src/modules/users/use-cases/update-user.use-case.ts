import { IUserRepository } from "../repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";
import { AppError } from "../../../shared/errors/app-error";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: any) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const updatedUser = await this.userRepository.update(id, data);

    return UserMapper.toResponseDto(updatedUser);
  }
}
