import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { router } from "./routes";
import { errorHandler, errorNotFoundHandler } from "./middleware/api-error";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      callback(null, true);
    },
  })
);

const PORT = 3000 || process.env.PORT;

app.use(morgan("dev"));

app.use("/", router);

app.use(errorNotFoundHandler);
app.use(errorHandler);

app.listen(PORT, "localhost", () => {
  console.log(`Starting Server`);
});
