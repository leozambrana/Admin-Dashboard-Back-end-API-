import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaPlansRepository } from "../repositories/prisma-plans.repository";

export const listPlansController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const plansRepository = new PrismaPlansRepository(prisma);
    const plans = await plansRepository.findAll();
    return res.json(plans);
  } catch (error) {
    next(error);
  }
};
