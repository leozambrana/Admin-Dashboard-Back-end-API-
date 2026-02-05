import { Status } from "@prisma/client";

export class UserFilters {
  private page: number;
  private limit: number;
  private search?: string;
  private status?: Status | "all";

  constructor(data: {
    page?: number;
    limit?: number;
    search?: string;
    status?: Status | "all";
  }) {
    this.page = Number(data.page) || 1;
    this.limit = Number(data.limit) || 10;
    this.search = data.search;
    this.status = data.status;
  }

  getWhere() {
    const where: any = {};

    if (this.search) {
      where.OR = [
        { name: { contains: this.search, mode: "insensitive" } },
        { email: { contains: this.search, mode: "insensitive" } },
      ];
    }

    if (this.status && this.status !== "all") {
      where.status = this.status;
    }

    return where;
  }

  getSkip() {
    return (this.page - 1) * this.limit;
  }

  getTake() {
    return this.limit;
  }

  getPage() {
    return this.page;
  }

  getLimit() {
    return this.limit;
  }
}
