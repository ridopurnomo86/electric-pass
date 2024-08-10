import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { router } from "./routes";
import { errorHandler, errorNotFoundHandler } from "./middleware/api-error";

const app = express();

const whitelist = ["http://localhost:3000", process.env.CORS_ORIGIN as string];

const PORT = Number(process.env.PORT) || 4004;

app.use(morgan("dev"));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
    preflightContinue: false,
    allowedHeaders: ["Content-Type", "Authorization", "Origin", " X-Requested-With", "Accept"],
    origin: whitelist,
  })
);

app.use("/", router);

app.use(errorNotFoundHandler);
app.use(errorHandler);

app.listen(PORT, "localhost", () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started localhost:${PORT}`);
});

export default app;
