import { Router } from "express";
import authRoutes from "../../modules/auth/routes/index.route";
import usersRoutes from "../../modules/users/routes/index.route";
import plansRoutes from "../../modules/plans/routes/index.route";
import projectsRoutes from "../../modules/projects/routes/index.route";
import dashboardRoutes from "../../modules/dashboard/routes/index.route";

const routes = Router();

routes.get("/health", (req, res) => {
  return res.json({ status: "ok", timestamp: new Date().toISOString() });
});

authRoutes(routes);
usersRoutes(routes);
plansRoutes(routes);
projectsRoutes(routes);
dashboardRoutes(routes);

export { routes };
