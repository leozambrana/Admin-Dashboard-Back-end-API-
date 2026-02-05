import { Prisma, User } from "@prisma/client";

export type GetUsersArgs = {
  select?: Prisma.UserSelect;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
  skip?: number;
  take?: number;
};

export interface IUserRepository {
  findMany(args: GetUsersArgs): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  delete(id: string): Promise<void>;
  count(where?: Prisma.UserWhereInput): Promise<number>;
}
