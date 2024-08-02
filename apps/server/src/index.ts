import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { router } from "./routes";
import { errorHandler, errorNotFoundHandler } from "./middleware/api-error";

const app = express();

const whitelist = ["http://localhost:3000", "https://elastic-pass.vercel.app"];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin as string) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  })
);

const PORT = Number(process.env.PORT) || 4004;

app.use(morgan("dev"));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use(errorNotFoundHandler);
app.use(errorHandler);

app.listen(PORT, "localhost", () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started localhost:${PORT}`);
});

export default app;
