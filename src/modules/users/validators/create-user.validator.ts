import { Request } from "express";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "EDITOR", "USER"]).optional(),
  planId: z.string(),
});

export class CreateUserValidator {
  private data: any;

  constructor(req: Request) {
    this.data = createUserSchema.parse(req.body);
  }

  getData() {
    return this.data;
  }
}
