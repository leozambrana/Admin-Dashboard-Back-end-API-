import { IUserRepository } from "../repositories/user.repository";
import { AppError } from "../../../shared/errors/app-error";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    await this.userRepository.delete(id);
  }
}
