import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { meController } from "../controllers/me.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";

export default (router: Router) => {
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Realiza login no sistema
   *     tags: [Auth]
   */
  router.post("/auth/login", loginController);

  /**
   * @swagger
   * /api/auth/me:
   *   get:
   *     summary: Retorna dados do usuário logado
   *     tags: [Auth]
   */
  router.get("/auth/me", authMiddleware, meController);
};
