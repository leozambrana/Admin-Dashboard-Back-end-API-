import { IUserRepository } from "../repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";
import { AppError } from "../../../shared/errors/app-error";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return UserMapper.toResponseDto(user);
  }
}
