import { User as UserEntity } from "@prisma/client";
import { UserResponseDto } from "../entities/user-response.dto";

export class UserMapper {
  static toResponseDto(entity: UserEntity): UserResponseDto {
    return new UserResponseDto({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      avatar: entity.avatar,
      role: entity.role,
      status: entity.status,
      planId: entity.planId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
