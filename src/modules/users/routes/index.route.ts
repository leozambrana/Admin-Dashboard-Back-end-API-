import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../config/upload";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { listUsersController } from "../controllers/list-users.controller";
import { getUserController } from "../controllers/get-user.controller";
import { createUserController } from "../controllers/create-user.controller";
import { updateUserController } from "../controllers/update-user.controller";
import { deleteUserController } from "../controllers/delete-user.controller";
import { updateUserAvatarController } from "../controllers/update-user-avatar.controller";
import { generateAvatarPresignController } from "../controllers/generate-avatar-presign.controller";

const upload = multer(uploadConfig);

export default (router: Router) => {
  router.get("/users", listUsersController);
  router.get("/users/:id", getUserController);
  router.post("/users", createUserController);
  
  router.post("/users/:id/avatar/presign", authMiddleware, generateAvatarPresignController);

  router.patch("/users/:id/avatar", authMiddleware, upload.single("avatar"), updateUserAvatarController);
  
  router.patch("/users/:id", updateUserController);
  router.delete("/users/:id", deleteUserController);
};
