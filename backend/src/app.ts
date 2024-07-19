import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { HttpLogger } from "./middleware/httpLogger";
import { authLimiter } from "./middleware/limiter";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use(HttpLogger);
app.use(authLimiter);

export default app;
