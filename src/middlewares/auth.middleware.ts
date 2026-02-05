import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../shared/errors/app-error";

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não fornecido", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.userId = decoded.userId;
    next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
