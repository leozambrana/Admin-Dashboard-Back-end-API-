import { Router } from "express";
import { listProjectsController } from "../controllers/list-projects.controller";
import { updateProjectController } from "../controllers/update-project.controller";

export default (router: Router) => {
  router.get("/projects", listProjectsController);
  router.patch("/projects/:id", updateProjectController);
};
