import { IUserRepository } from "../repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";
import { AppError } from "../../../shared/errors/app-error";
import bcrypt from "bcryptjs";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: any) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("Email já está em uso", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
    });

    return UserMapper.toResponseDto(user);
  }
}
