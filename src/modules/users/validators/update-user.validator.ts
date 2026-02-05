import { Request } from "express";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(["ADMIN", "EDITOR", "USER"]).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  planId: z.string().optional(),
});

export class UpdateUserValidator {
  private data: any;

  constructor(req: Request) {
    this.data = updateUserSchema.parse(req.body);
  }

  getData() {
    return this.data;
  }
}
