import { IUserRepository } from "../repositories/user.repository";
import { UserFilters } from "../entities/user-filters.vo";
import { UserMapper } from "../mappers/user.mapper";

export class ListUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(filters: UserFilters) {
    const where = filters.getWhere();
    const skip = filters.getSkip();
    const take = filters.getTake();

    const [users, total] = await Promise.all([
      this.userRepository.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      this.userRepository.count(where),
    ]);

    return {
      data: users.map(UserMapper.toResponseDto),
      meta: {
        total,
        page: filters.getPage(),
        limit: filters.getLimit(),
        totalPages: Math.ceil(total / filters.getLimit()),
      },
    };
  }
}
