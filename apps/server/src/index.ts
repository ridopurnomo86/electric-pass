import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { router } from "./routes";
import { errorHandler, errorNotFoundHandler } from "./middleware/api-error";
import apiAuthHandler from "./middleware/api-auth";
import apiLimiter from "./config/rate-limiter";

const app = express();

const whitelist = ["http://localhost:3000", process.env.CORS_ORIGIN as string];

const PORT = Number(process.env.PORT) || 4004;

app.use(morgan("dev"));
app.use(helmet());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(
  cors({
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
    preflightContinue: false,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      " X-Requested-With",
      "Accept",
      "x-api-key",
    ],
    origin: whitelist,
  })
);

app.use(apiAuthHandler);

app.use(apiLimiter);

app.use("/", router);

app.use(errorNotFoundHandler);
app.use(errorHandler);

app.listen(PORT, "localhost", () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started localhost:${PORT}`);
});

export default app;
