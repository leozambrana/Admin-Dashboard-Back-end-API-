import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { routes } from "./shared/routes";
import { errorHandler } from "./middlewares/error-handler";
import uploadConfig from "./config/upload";

const app = express();

// Serve arquivos estáticos da pasta 'uploads' na raiz do projeto
app.use("/files", express.static(path.resolve(process.cwd(), "uploads")));

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000",
      process.env.CORS_ORIGIN,
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
