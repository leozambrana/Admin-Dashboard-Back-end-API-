import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../db/prisma/client";
import { PrismaUserRepository } from "../../users/repositories/prisma-user.repository";
import { PrismaProjectsRepository } from "../../projects/repositories/prisma-projects.repository";

export const getStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = new PrismaUserRepository(prisma);
    const projectsRepository = new PrismaProjectsRepository(prisma);

    const [
      totalUsers,
      activeUsers,
      activeProjects,
    ] = await Promise.all([
      userRepository.count(),
      userRepository.count({ status: "ACTIVE" }),
      projectsRepository.countByStatus("ACTIVE"),
    ]);

    const chartData = [
      { date: "Seg", users: 120, revenue: 4500 },
      { date: "Ter", users: 145, revenue: 5200 },
      { date: "Qua", users: 132, revenue: 4800 },
      { date: "Qui", users: 178, revenue: 6100 },
      { date: "Sex", users: 165, revenue: 5800 },
      { date: "Sáb", users: 89, revenue: 3200 },
      { date: "Dom", users: 56, revenue: 2100 },
    ];

    return res.json({
      totalUsers,
      activeUsers,
      activeProjects,
      totalRevenue: 124580,
      pendingTasks: 156,
      revenueGrowth: 12.5,
      userGrowth: 8.3,
      chartData,
    });
  } catch (error) {
    next(error);
  }
};
