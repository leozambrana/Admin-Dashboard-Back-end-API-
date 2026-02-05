import { Router } from "express";
import { listPlansController } from "../controllers/list-plans.controller";

export default (router: Router) => {
  router.get("/plans", listPlansController);
};
