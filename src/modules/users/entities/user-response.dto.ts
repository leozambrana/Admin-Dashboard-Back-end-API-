import { Role, Status } from "@prisma/client";

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: Role;
  status: Status;
  planId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.role = data.role;
    this.status = data.status;
    this.planId = data.planId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
