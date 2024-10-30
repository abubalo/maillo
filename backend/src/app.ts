import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import httpLogger from "./middleware/httpLogger";
import { apiRateLimiter, authLimiter } from "./middleware/limiter";
import { corsOptions } from "./config/corsOptions";
import userRoutes from "./routes/user.routes";
import emailRoutes from "./routes/maillo.routes";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { isAuthorized } from "./middleware/isAuthorized";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(httpLogger);
app.use(authLimiter);
app.use(errorHandler);

app.use("users/", apiRateLimiter, userRoutes);
app.use("maillo/", apiRateLimiter, isAuthenticated, isAuthorized, emailRoutes);

export default app;
