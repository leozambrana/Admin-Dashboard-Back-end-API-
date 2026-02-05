import { Router } from "express";
import { listUsersController } from "../controllers/list-users.controller";
import { getUserController } from "../controllers/get-user.controller";
import { createUserController } from "../controllers/create-user.controller";
import { updateUserController } from "../controllers/update-user.controller";
import { deleteUserController } from "../controllers/delete-user.controller";

export default (router: Router) => {
  router.get("/users", listUsersController);
  router.get("/users/:id", getUserController);
  router.post("/users", createUserController);
  router.patch("/users/:id", updateUserController);
  router.delete("/users/:id", deleteUserController);
};
