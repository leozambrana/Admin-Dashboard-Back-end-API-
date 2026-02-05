import { Router } from "express";
import { getStatsController } from "../controllers/get-stats.controller";

export default (router: Router) => {
  router.get("/dashboard/stats", getStatsController);
};
